import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest, forkJoin, Observable, pipe, Subscription } from 'rxjs';
import { ItemData } from 'src/app/model/item-data';
import { PromoData } from 'src/app/model/promo-data';
import { ProductService } from 'src/app/services/product-service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer-service';
import * as lodash from 'lodash';
import { CustomerOrderItemData } from 'src/app/model/customer-order-item-data';
import { ItemConfigComponent } from '../popup/item-config/item-config.component';
import { NgxMasonryComponent } from 'ngx-masonry';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit, OnDestroy {

  searchBox = new FormControl();
  showInvoice = false;
  showInvoice$: Subscription;
  allItems: ItemData[];
  filteredItems: ItemData[]

  allPromos: PromoData[];
  filteredPromos: PromoData[];
  cardSub$: Subscription;
  removed$: Subscription;

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  constructor(private router: Router,
    private productService: ProductService,
    private customerService: CustomerService,
    public dialog: MatDialog,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.cardSub$ = combineLatest([this.customerService.currentPromoList$, this.customerService.currentItemList$, this.searchBox.valueChanges]).subscribe(
      ([promoList, itemList, searchBox]) => {
        this.allItems = itemList;
        this.allPromos = promoList;
        this.filteredItems = this._filter(searchBox, itemList);
        this.filteredPromos = this._filter2(searchBox, itemList, promoList);
        if (this.masonry !== undefined) {
          this.masonry.reloadItems();
          this.masonry.layout();
        }
      });

    this.removed$ = this.customerService.removedProduct$.subscribe((removedProduct: CustomerOrderItemData) => {
      if (removedProduct !== null && removedProduct !== undefined) {
        if (removedProduct.productType === 'item') {
          const index = this.allItems.findIndex(x => x.itemId === removedProduct.productCode);
          let stocks = this.allItems[index].stocksLeft;
          this.allItems[index].stocksLeft = stocks + removedProduct.quantity;
        } else {
          const index = this.allPromos.findIndex(x => x.promoId === removedProduct.productCode);
          this.allPromos[index].promoItemList.forEach(promoItem => {
            const index = this.allItems.findIndex(x => x.itemId === promoItem.item.itemId);
            let stocks = this.allItems[index].stocksLeft;
            this.allItems[index].stocksLeft = stocks + (removedProduct.quantity * promoItem.quantity);
          });
        }
        this.customerService.setCurrentItemList(this.allItems);
        this.updatePromoStock();
      }

      this.showInvoice$ = this.customerService.closeInvoice$.subscribe((closeInvoice: boolean) => {
        this.showInvoice = !closeInvoice;
      })
    });



    this.searchBox.setValue("");
  }

  private _filter(value: string, itemDataList: ItemData[]): ItemData[] {
    let itemListWithStock = itemDataList.filter(item => item.stocksLeft != 0);
    if (value === "" || value === undefined) {
      return itemListWithStock;
    } else {
      const filterValue = value.toString().toLowerCase();
      return itemListWithStock.filter(item => item.itemName.toLowerCase().indexOf(filterValue) >= 0);
    }
  }

  private _filter2(value: string, itemList: ItemData[], promoList: PromoData[]): PromoData[] {
    let promoListWitchStock = promoList.filter(promo => promo.stocksLeft != 0);

    if (value === "" || value === undefined) {
      return promoListWitchStock;
    } else {
      const filterValue = value.toString().toLowerCase();
      return promoListWitchStock.filter(promo => promo.promoName.toLowerCase().indexOf(filterValue) >= 0);
    }
  }

  ngOnDestroy() {
    this.cardSub$.unsubscribe();
    this.customerService.removeProduct(null);
    this.removed$.unsubscribe();
    this.customerService.close(true);
    this.showInvoice$.unsubscribe();
  }

  selectProduct(product: any, type: String) {
    let customerOrderItemData = new CustomerOrderItemData;
    customerOrderItemData.product = product;
    customerOrderItemData.productType = type;
    customerOrderItemData.quantity = 1;
    customerOrderItemData.itemDiscount = 0;
    if (type == 'item') {
      customerOrderItemData.sellingPrice = product.srp;
      customerOrderItemData.freebie = false;
      customerOrderItemData.name = product.itemName + " " + product.size;
      customerOrderItemData.variant = product.variant != '' && product.variant != undefined ? "(" + product.variant + ")" : "";
      customerOrderItemData.productCode = product.itemId;
    } else {
      customerOrderItemData.sellingPrice = product.promoPrice;
      customerOrderItemData.freebie = false;
      customerOrderItemData.promoItemList = product.promoItemList;
      customerOrderItemData.productCode = product.promoId;
    }

    const dialogRef = this.dialog.open(ItemConfigComponent, {
      data: customerOrderItemData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.addProduct(result);
        this.updateItemStock(product, type, result.quantity);
      }

    });

  }

  updateItemStock(product: any, type: String, itemQuantity: number) {
    if (type === 'promo') {
      const index = this.allPromos.findIndex(x => x.promoId === product.promoId);
      this.allPromos[index].promoItemList.forEach(promoItem => {
        const index = this.allItems.findIndex(x => x.itemId === promoItem.item.itemId);
        this.allItems[index].stocksLeft = this.allItems[index].stocksLeft - (promoItem.quantity * itemQuantity);
      });

    } else {
      const index = this.allItems.findIndex(x => x.itemId === product.itemId);
      this.allItems[index].stocksLeft = this.allItems[index].stocksLeft - itemQuantity;
    }
    this.customerService.setCurrentItemList(this.allItems);
    this.updatePromoStock();
  }

  updatePromoStock() {
    this.allPromos.forEach(promo => {
      let requiredStockCount = new Map;
      let actualStockCount = new Map;
      let itemIdKeys = [];
      let stockCount = 0;
      promo.promoItemList.forEach(promoItem => {
        if (requiredStockCount.has(promoItem.item.itemId)) {
          stockCount = requiredStockCount.get(promoItem.item.itemId) + promoItem.quantity;
        } else {
          stockCount = promoItem.quantity;
        }
        requiredStockCount.set(promoItem.item.itemId, stockCount);
        let tempItem = this.allItems[this.allItems.findIndex(x => x.itemId === promoItem.item.itemId)];
        actualStockCount.set(promoItem.item.itemId, tempItem.stocksLeft);
        if (!(tempItem.itemId in itemIdKeys)) itemIdKeys.push(tempItem.itemId);
      });

      let sufficientStockMap = new Map;
      itemIdKeys.forEach(itemId => {
        let sufficientStock = (actualStockCount.get(itemId) / requiredStockCount.get(itemId)) | 0;
        sufficientStockMap.set(itemId, sufficientStock);
      });
      let values: number[] = Array.from(sufficientStockMap.values());

      let promoCount = Math.min(...values)
      promo.stocksLeft = promoCount;
    });

    this.customerService.setCurrentPromoList(this.allPromos);
    this.showInvoice = true;
  }



}
