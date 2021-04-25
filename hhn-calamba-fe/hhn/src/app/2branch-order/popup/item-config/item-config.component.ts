import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BranchOrderItemData } from 'src/app/model/branch-order-item-data';

@Component({
  selector: 'app-item-config',
  templateUrl: './item-config.component.html',
  styleUrls: ['./item-config.component.css']
})
export class ItemConfigComponent implements OnInit {

  product: BranchOrderItemData;
  disabledbtn = false;
  totalSRP = 0;
  totalDealersPrice: any = 0;
  constructor(public dialogRef: MatDialogRef<ItemConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    
    this.product = this.data;
    this.totalSRP = this.product.srp;
    this.totalDealersPrice = this.product.dealersPrice; 

  
  }

  remove() {
    this.product.quantity--;
    if (this.product.quantity <= 1) {
      this.disabledbtn = true;
    }
    this.computePrice();
  }

  add() {
    this.product.quantity++;
    if (this.product.quantity != 0) {
      this.disabledbtn = false;
    }
    this.computePrice();
  }

  computePrice(){
    this.totalSRP = this.product.srp * this.product.quantity;
    this.totalDealersPrice = (parseFloat(this.product.dealersPrice) * parseFloat(this.product.quantity)).toFixed(2);
  }

  addItem(isfreebie){
    this.product.freebie = isfreebie;
    this.product.srp = this.totalSRP;
    this.product.dealersPrice = this.totalDealersPrice;
  }
  

}
