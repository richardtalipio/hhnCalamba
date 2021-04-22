import { E } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemData } from 'src/app/model/item-data';
import { PromoData } from 'src/app/model/promo-data';
import { PromoItemData } from 'src/app/model/promo-item-data';
import { ItemService } from 'src/app/services/item-service';
import { PromoService } from 'src/app/services/promo-service';

@Component({
  selector: 'app-promo-prices',
  templateUrl: './promo-prices.component.html',
  styleUrls: ['./promo-prices.component.css']
})
export class PromoPricesComponent implements OnInit, OnDestroy {

  constructor(private itemService: ItemService,
    private router: Router,
    private fb: FormBuilder,
    private promoService: PromoService) { }

  selectedItems: ItemData[] = [];
  loadSelectedItems$: Subscription;
  promoItemLists = new FormArray([]);
  grandTotal = 0;
  promoPrice = 0;
  test$: Subscription;
  freeItems = [];

  ngOnInit(): void {
    this.loadSelectedItems$ = this.itemService.selectedItems.subscribe(selectedItems => {
      this.selectedItems = selectedItems;
      this.createPromoItem();
    });
  }

  ngOnDestroy(){
    this.loadSelectedItems$.unsubscribe();
  }

  goBack(){
    this.itemService.setSelectedItems(this.selectedItems);
    this.router.navigate(['products/promos/new-promo']);
  }

  createPromoItem() {
    this.promoItemLists.clear();
    let pricePattern = "\^([\\d]{0,4})(\\.|$)([\\d]{2,2}|)$";
    this.selectedItems.forEach(item => {
      const promoItem = this.fb.group({
        promoItemId: "",
        promoItemName: item.itemName + " " + item.size + (item.variant ? " (" + item.variant + ")" : ""),
        quantity: [1, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.min(1)]],
        oldPrice: item.srp,
        itemPrice  : item.srp,
        item: [item],
      });
      this.promoItemLists.push(promoItem);
      this.grandTotal = this.grandTotal + item.srp;
      this.promoPrice = this.promoPrice + item.srp;
    });
  }

  onQuantityChange(index: any) {

    const promoItem = this.promoItemLists.at(index).value;
    const price = promoItem.quantity * promoItem.item.srp;
    this.promoItemLists.at(index).get("oldPrice").patchValue(price);
    this.promoItemLists.at(index).get("itemPrice").patchValue(price);
    this.recomputeTotal();
   
  }

  recomputeTotal(){
    this.grandTotal = 0;
    this.promoPrice = 0;
    this.freeItems = []
    this.promoItemLists.controls.forEach(promoItem => {
      this.grandTotal = this.grandTotal + parseFloat(promoItem.value.oldPrice);
      if(promoItem.value.itemPrice == "" || promoItem.value.itemPrice == 0){
        this.freeItems.push(promoItem.value.promoItemName);
      }else{
        this.promoPrice = this.promoPrice + parseFloat(promoItem.value.itemPrice);
      }
    })
  }

  deleteItems(index: any){
    this.selectedItems.splice(index, 1);
    this.promoItemLists.removeAt(index);
    if(this.selectedItems.length == 0){
      this.goBack();
    }else{
      this.recomputeTotal();
    }
  }

  confirm(){
    let savings = this.grandTotal - this.promoPrice;
    
    if(savings <= 0){
      return;
    }
    let promoName = ""
   
    if(this.freeItems.length == 0){
      promoName = "Get P"+savings+" off when you buy ";
    }
    if(this.freeItems.length != 0){
      let free = "Get";
      this.freeItems.forEach(freeItem => {
        free = free + " "+freeItem;
      });
      promoName = promoName + free + " for free when you buy";
    }

    let promoItemArray = [];
    let items = "" 
    this.promoItemLists.controls.forEach(element => {
      if(element.value.itemPrice != 0 && element.value.itemPrice != "" ){
        let quantity = element.value.quantity == 1 ? "" : element.value.quantity+" ";
        if(items != ""){
          items = items+ " + "+quantity+element.value.promoItemName; 
        }else{
          items = items+ " "+quantity+element.value.promoItemName;
        } 
      }
      promoItemArray.push(element.value);
    });
    
    promoName = promoName + items;

    let newPromo = new PromoData;
    newPromo.promoName = promoName;
    newPromo.promoPrice = this.promoPrice;
    newPromo.active = true;

    this.promoService.postPromoData({promo: newPromo, promoItemList: promoItemArray}).subscribe(result =>{
      this.router.navigate(['products/promos']);
    })
    console.log(newPromo);
    console.log(promoItemArray);
  }

}
