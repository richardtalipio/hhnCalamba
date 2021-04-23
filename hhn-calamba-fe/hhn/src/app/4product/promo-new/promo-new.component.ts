import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ItemData } from 'src/app/model/item-data';
import { ItemService } from 'src/app/services/item-service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PromoItemData } from 'src/app/model/promo-item-data';
import { MatDialog } from '@angular/material/dialog';
import { PromoConfigComponent } from '../popup/promo-config/promo-config.component';
import { PromoService } from 'src/app/services/promo-service';

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

  showDraft = false ;

  constructor(private router: Router,
    private itemService: ItemService,
    private promoService: PromoService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.itemMenuSubscription$ = this.itemService.getAllItems().pipe(
      map(itemList => { this.allItems = itemList }),
      switchMap(() => this.promoService.selectedPromoItemObs),
      switchMap(result => {
        if (result.length == 0) this.showDraft = false;
        return this.itemService.selectedItems
      })
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

  selectItem(item: ItemData) {
    let promoItemData = new PromoItemData;
    promoItemData.item = item;
    promoItemData.oldPrice = item.srp;
    promoItemData.quantity = 1;
    promoItemData.promoItemName = item.itemName + " " + item.size + (item.variant ? " (" + item.variant + ")" : "")
    const dialogRef = this.dialog.open(PromoConfigComponent, {
      data: promoItemData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.promoService.addNewSelectedPromoItem(result);
        this.showDraft = true;
      }

    });

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
