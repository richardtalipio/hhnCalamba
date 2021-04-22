import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemData } from 'src/app/model/item-data';
import { PromoData } from 'src/app/model/promo-data';
import { PromoItemData } from 'src/app/model/promo-item-data';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-branch-order-prices',
  templateUrl: './branch-order-prices.component.html',
  styleUrls: ['./branch-order-prices.component.css']
})
export class BranchOrderPricesComponent implements OnInit {

  constructor(private router: Router,
    private fb: FormBuilder,
    private productService: ProductService) { }

  branchOrderForm: FormGroup;
  branchOrderItemList = new FormArray([]);
  promoList: PromoData[]= []
  itemList: ItemData[] = []

  ngOnInit(): void {
    this.initializeForm();
  }

  goBack() {
    this.productService.setSelectedItems(this.itemList);
    this.productService.setselectedPromos(this.promoList);
    this.router.navigate(['branch-order/new']);
  }

  initializeForm() {
    let pricePattern = "\^([\\d]{0,4})(\\.|$)([\\d]{2,2}|)$";
    this.branchOrderForm = this.fb.group({
      branchOrderId: "",
      orderDate: new Date,
      deliveryDate: [new Date, [Validators.required]],
      grandTotal: 0,
      deliveryMethod: ["", [Validators.required]],
      paymentMethod: ["", [Validators.required]],
      deliveryCharge: [0, [Validators.pattern(pricePattern)]],
      status: "New Order",
      delivered: false,
      paid: false
    });

    this.productService.selectedItems.subscribe(selectedItem => {
      this.itemList = selectedItem;
      selectedItem.forEach(item => {
        
        const branchOrderItem = this.fb.group({
          branchOrderItemId: "",
          branchOrderItemName: item.itemName + " " + item.size + (item.variant ? " (" + item.variant + ")" : ""),
          quantity: [1, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.min(1)]],
          dealersPrice: item.srp,
          freebie: false,
          productType: "item",
          productCode: item.itemId
        });
        this.branchOrderItemList.push(branchOrderItem);
      });
    });
    this.productService.selectedPromos.subscribe(selectedPromos => {
      this.promoList = selectedPromos;
      selectedPromos.forEach(promo => {
        let promoItems = "";
        promo.promoItemList.forEach(element => {
          let name = element.quantity == 1 ? element.item.itemName : element.quantity + " " + element.item.itemName
          if(promoItems == ""){
            promoItems = name;
          }else{
            promoItems = promoItems + "\n"+name;
          }
        });
        const branchOrderItem = this.fb.group({
          branchOrderItemId: "",
          branchOrderItemName: promo.promoName,
          quantity: [1, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.min(1)]],
          dealersPrice: promo.promoPrice,
          freebie: false,
          productType: "promo",
          productCode: promo.promoId,
          promoItems: promoItems
        });
        this.branchOrderItemList.push(branchOrderItem);
      });
    });
  }

  deleteItems(product: any, formInd: any){
    this.branchOrderItemList.removeAt(formInd);
    if(product.productType == "item"){
      const index = this.itemList.findIndex(item => item.itemId == product.productCode);
      this.itemList.splice(index, 1);
      
    }else{
      const index = this.promoList.findIndex(promo => promo.promoId == product.productCode);
      this.promoList.splice(index, 1);
    }
    

  
    if(this.branchOrderItemList.length == 0){
      this.goBack();
    }else{
      // this.recomputeTotal();
    }
  }

  // recomputeTotal(){
  //   let tempTotal = 0;
  //   this.promoPrice = 0;
  //   this.freeItems = []
  //   this.promoItemLists.controls.forEach(promoItem => {
  //     this.grandTotal = this.grandTotal + parseFloat(promoItem.value.oldPrice);
  //     if(promoItem.value.itemPrice == "" || promoItem.value.itemPrice == 0){
  //       this.freeItems.push(promoItem.value.promoItemName);
  //     }else{
  //       this.promoPrice = this.promoPrice + parseFloat(promoItem.value.itemPrice);
  //     }
  //   })
  // }
}
