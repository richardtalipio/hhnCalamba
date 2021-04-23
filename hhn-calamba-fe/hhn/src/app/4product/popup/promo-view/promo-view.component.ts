import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromoData } from 'src/app/model/promo-data';

@Component({
  selector: 'app-promo-view',
  templateUrl: './promo-view.component.html',
  styleUrls: ['./promo-view.component.css']
})
export class PromoViewComponent implements OnInit {

  promo: PromoData;
  actualPrice;
  promoPrice;
  constructor(public dialogRef: MatDialogRef<PromoViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.promo = this.data;
    this.actualPrice = 0;
    this.promoPrice = (this.promo.promoPrice).toFixed(2);
    this.promo.promoItemList.forEach(item => { 
        let quantityPrice = parseFloat(item.item.srp) * item.quantity;
        this.actualPrice = (parseFloat(this.actualPrice) + quantityPrice).toFixed(2);
    })
  }

}
