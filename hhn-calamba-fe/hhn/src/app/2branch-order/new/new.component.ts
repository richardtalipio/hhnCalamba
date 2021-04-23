import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, Observable, Subscription } from 'rxjs';
import { ItemData } from 'src/app/model/item-data';
import { ItemService } from 'src/app/services/item-service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PromoData } from 'src/app/model/promo-data';
import { ProductService } from 'src/app/services/product-service';
import { MatDialog } from '@angular/material/dialog';
import { ItemConfigComponent } from '../popup/item-config/item-config.component';
import { BranchOrderData } from 'src/app/model/branch-order-data';
import { BranchOrderItemData } from 'src/app/model/branch-order-item-data';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {

  searchBox = new FormControl();
  showInvoice = false;

  allItems: ItemData[];
  filteredItems: Observable<ItemData[]>;

  allPromos: PromoData[];
  filteredPromos: Observable<PromoData[]>;
  cardSub$: Subscription;

  constructor(private router: Router,
    private productService: ProductService,
    public dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.cardSub$ = this.productService.getAllProducts().pipe(
      map(productList => {
        this.allItems = productList.items;
        this.allPromos = productList.promos;
      }),
      switchMap(result => this.productService.selectedProduct)
    ).subscribe(result => {
      if (result.length == 0) this.showInvoice = false;
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

  selectProduct(product: any, type: String) {

    let branchOrderItem = new BranchOrderItemData;
    branchOrderItem.product = product;
    branchOrderItem.productType = type;
    branchOrderItem.quantity = 1;
    if (type == 'item') {
      branchOrderItem.srp = product.srp;
      branchOrderItem.dealersPrice = (product.srp - (product.srp * 0.30)).toFixed(2);
      branchOrderItem.freebie = false;
      branchOrderItem.name = product.itemName + " " + product.size;
      branchOrderItem.variant = product.variant != '' && product.variant != undefined ? "(" + product.variant + ")" : "";
      branchOrderItem.productCode = product.itemId;
    } else {
      branchOrderItem.srp = product.promoPrice;
      branchOrderItem.dealersPrice = (product.promoPrice - (product.promoPrice * 0.30)).toFixed(2);
      branchOrderItem.freebie = false;
      branchOrderItem.promoItemList = product.promoItemList;
      branchOrderItem.productCode = product.promoId;
    }

    const dialogRef = this.dialog.open(ItemConfigComponent, {
      data: branchOrderItem
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addNewSelectedProduct(result);
        this.showInvoice = true;
      }

    });
  }

  ngOnDestroy() {
    this.cardSub$.unsubscribe();
  }
}
