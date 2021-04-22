import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ItemData } from 'src/app/model/item-data';
import { ItemService } from 'src/app/services/item-service';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-promo-new',
  templateUrl: './promo-new.component.html',
  styleUrls: ['./promo-new.component.css']
})
export class PromoNewComponent implements OnInit, OnDestroy{


  filter;
  allItems: ItemData[];
  filteredItems: Observable<ItemData[]>;
  searchBox = new FormControl();
  selectedItems: ItemData[] = [];
  itemMenuSubscription$: Subscription;

  constructor(private router: Router,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemMenuSubscription$ = this.itemService.getAllItems().pipe(
      map(itemList => { this.allItems = itemList }),
      switchMap(itemList => this.itemService.selectedItems)
    ).subscribe(selectedItemList => {
      selectedItemList.forEach(selectedItem => {
        this.selectItem(selectedItem.itemName);
      });

      this.filteredItems = this.searchBox.valueChanges.pipe(
        startWith(null),
        map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));

    });
  }

  private _filter(value: string): ItemData[] {
    const filterValue = value.toString().toLowerCase();

    return this.allItems.filter(item => item.itemName.toLowerCase().indexOf(filterValue) >= 0);
  }

  selectItem(itemName: String) {
    const index = this.allItems.findIndex(x => x.itemName === itemName);
    const selectedIndex = this.selectedItems.findIndex(x => x.itemName === itemName);

    if (selectedIndex < 0) {
      this.selectedItems.push(this.allItems.splice(index, 1)[0]);
      this.filteredItems = this.searchBox.valueChanges.pipe(
        startWith(null),
        map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));
    }

    this.searchBox.patchValue("");
  }

  saveSelected() {
    if (this.selectedItems.length != 0) {
      this.itemService.setSelectedItems(this.selectedItems);
      this.router.navigate(['products/promos/promo-prices']);
    }
  }

  ngOnDestroy(){
    this.itemMenuSubscription$.unsubscribe();
  }
}
