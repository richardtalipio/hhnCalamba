import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromoItemData } from 'src/app/model/promo-item-data';

@Component({
  selector: 'app-promo-config',
  templateUrl: './promo-config.component.html',
  styleUrls: ['./promo-config.component.css']
})
export class PromoConfigComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PromoConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  promoItem: PromoItemData;
  totalSRP = 0;
  disabledbtn = true;
  ngOnInit(): void {
    this.promoItem = this.data;
    this.promoItem.itemPrice  = this.totalSRP = this.promoItem.item.srp;
    this.promoItem.oldPrice  = this.totalSRP = this.promoItem.item.srp;
    
  }

  remove() {
    this.promoItem.quantity--;
    if (this.promoItem.quantity <= 1) {
      this.disabledbtn = true;
    }
    this.computePrice();
  }

  add() {
    this.promoItem.quantity++;
    if (this.promoItem.quantity != 0) {
      this.disabledbtn = false;
    }
    this.computePrice();
  }

  computePrice(){
    this.promoItem.itemPrice = this.totalSRP = this.promoItem.item.srp * this.promoItem.quantity;
    this.promoItem.oldPrice =  this.totalSRP = this.promoItem.item.srp * this.promoItem.quantity;
  }

  addItem(isfreebie){
    this.promoItem.freebie = isfreebie;
    if(this.promoItem.itemPrice == 0 || this.promoItem.itemPrice == undefined) {
      this.promoItem.freebie = true;
      this.promoItem.itemPrice = 0;
    }
    
  }


}
