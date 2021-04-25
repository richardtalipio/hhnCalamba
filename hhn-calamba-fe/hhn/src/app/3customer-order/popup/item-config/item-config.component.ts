import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerOrderItemData } from 'src/app/model/customer-order-item-data';

@Component({
  selector: 'app-item-config',
  templateUrl: './item-config.component.html',
  styleUrls: ['./item-config.component.css']
})
export class ItemConfigComponent implements OnInit {

  product: CustomerOrderItemData;
  disableAdd = false;
  disableRemove = true;
  totalSRP;
  discountedPrice;
  
 
  constructor(public dialogRef: MatDialogRef<ItemConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    
    this.product = this.data;
    this.discountedPrice = this.totalSRP = this.product.sellingPrice.toFixed(2);
    this.checkBtnRemove();
    this.checkBtnAdd();

    
  }

  checkBtnRemove(){
    if (this.product.quantity <= 1 ) {
      this.disableRemove = true;
    }
    if(this.product.quantity < this.product.product.stocksLeft){
      this.disableAdd = false;
    }
  }

  checkBtnAdd(){
    if(this.product.quantity > 1){
      this.disableRemove = false;
    }
    if(this.product.quantity >= this.product.product.stocksLeft){
      this.disableAdd = true;
    }
  }

  remove() {
    this.product.quantity--;
    this.checkBtnRemove()
    this.computePrice();
  }

  add() {
    this.product.quantity++;
    this.checkBtnAdd();
    this.computePrice();
  }

  computePrice(){
    
    this.totalSRP = (parseFloat(this.product.sellingPrice) * parseFloat(this.product.quantity)).toFixed(2);
    this.discountedPrice = (this.totalSRP - (this.totalSRP*this.product.itemDiscount/100) ).toFixed(2);
  }

  addItem(isfreebie){
    this.product.freebie = isfreebie;
    this.product.sellingPrice = this.discountedPrice;
  }
  
}
