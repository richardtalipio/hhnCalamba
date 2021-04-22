import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, Observable, Subscription } from 'rxjs';
import { ItemData } from 'src/app/model/item-data';
import { ItemService } from 'src/app/services/item-service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PromoData } from 'src/app/model/promo-data';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-new-branch-order',
  templateUrl: './new-branch-order.component.html',
  styleUrls: ['./new-branch-order.component.css']
})
export class NewBranchOrderComponent implements OnInit, OnDestroy {

  searchBox = new FormControl();

  allItems: ItemData[];
  filteredItems: Observable<ItemData[]>;
  selectedItems: ItemData[] = [];

  allPromos: PromoData[];
  filteredPromos: Observable<PromoData[]>;
  selectedPromos: PromoData[] = [];
  cardSub$: Subscription;
  selectedProduct = 0;

  constructor(private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {

    this.cardSub$ = this.productService.getAllProducts().pipe(
      map(productList => {
        this.allItems = productList.items;
        this.allPromos = productList.promos;
      }),
      switchMap(result => combineLatest([this.productService.selectedItems, this.productService.selectedPromos]))
    ).subscribe(([selectedItemList, selectedPromosList]) => {
      selectedItemList.forEach(selectedItem => {
        this.selectItem(selectedItem.itemName);
      });

      selectedPromosList.forEach(selectedPromo => {
        this.selectPromo(selectedPromo.promoName);
      });

      this.filteredItems = this.searchBox.valueChanges.pipe(
        startWith(null),
        map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));
      this.filteredPromos = this.searchBox.valueChanges.pipe(
        startWith(null),
        map((promo: string | null) => promo ? this._filter2(promo) : this.allPromos.slice()));


    });
  }

  private _filter(value: string): ItemData[] {
    const filterValue = value.toString().toLowerCase();

    return this.allItems.filter(item => item.itemName.toLowerCase().indexOf(filterValue) >= 0);
  }

  private _filter2(value: string): PromoData[] {
    const filterValue = value.toString().toLowerCase();

    return this.allPromos.filter(promo => promo.promoName.toLowerCase().indexOf(filterValue) >= 0);
  }

  selectItem(itemName: String) {
    const index = this.allItems.findIndex(x => x.itemName === itemName);
    const selectedIndex = this.selectedItems.findIndex(x => x.itemName === itemName);

    if (selectedIndex < 0) {
      this.selectedItems.push(this.allItems.splice(index, 1)[0]);
      this.filteredItems = this.searchBox.valueChanges.pipe(
        startWith(null),
        map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));
      this.selectedProduct++;
      this.searchBox.patchValue("");
    }
  }

  selectPromo(promoName: String) {
    const index = this.allPromos.findIndex(x => x.promoName === promoName);
    const selectedIndex = this.selectedPromos.findIndex(x => x.promoName === promoName);
    

    if (selectedIndex < 0) {
      this.selectedPromos.push(this.allPromos.splice(index, 1)[0]);
      this.filteredPromos = this.searchBox.valueChanges.pipe(
        startWith(null),
        map((promo: string | null) => promo ? this._filter2(promo) : this.allPromos.slice()));
      this.selectedProduct++;
      this.searchBox.patchValue("");
    }
  }

  configurePrices() {
    this.productService.setSelectedItems(this.selectedItems);
    this.productService.setselectedPromos(this.selectedPromos);
    this.router.navigate(['branch-order/prices']);
  }

  ngOnDestroy() {
    this.cardSub$.unsubscribe();
  }
}
