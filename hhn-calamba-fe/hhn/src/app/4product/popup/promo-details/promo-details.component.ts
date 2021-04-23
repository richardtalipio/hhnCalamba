import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromoData } from 'src/app/model/promo-data';

@Component({
  selector: 'app-promo-details',
  templateUrl: './promo-details.component.html',
  styleUrls: ['./promo-details.component.css']
})
export class PromoDetailsComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }

  promoData: PromoData
  actualPrice = 0;
  ngOnInit(): void {
    this.promoData = this.data.newPromo;
    this.actualPrice = this.data.actualPrice;
  }

  confirm(){
    
  }

}
