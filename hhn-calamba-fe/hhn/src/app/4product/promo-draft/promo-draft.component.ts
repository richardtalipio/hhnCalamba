import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PromoData } from 'src/app/model/promo-data';
import { PromoItemData } from 'src/app/model/promo-item-data';
import { PromoService } from 'src/app/services/promo-service';
import { PromoDetailsComponent } from '../popup/promo-details/promo-details.component';

@Component({
  selector: 'app-promo-draft',
  templateUrl: './promo-draft.component.html',
  styleUrls: ['./promo-draft.component.css']
})
export class PromoDraftComponent implements OnInit {

  constructor(private promoService: PromoService,
    private router: Router,
    public dialog: MatDialog) { }

  promoItemData: PromoItemData[]
  promoPrice;
  actualPrice;
  freeItems = [];

  ngOnInit(): void {
    this.promoService.selectedPromoItemObs.subscribe((data: PromoItemData[]) => {
      this.promoPrice = 0;
      this.actualPrice = 0;
      this.promoItemData = data;
      this.freeItems = [];
      data.forEach(item => {
        if (!item.freebie) {
          this.promoPrice = (parseFloat(this.promoPrice) + parseFloat(item.itemPrice)).toFixed(2);
        }else{
          this.freeItems.push(item.quantity+ " " +item.promoItemName);
        }
        this.actualPrice = (parseFloat(this.actualPrice) + parseFloat(item.oldPrice)).toFixed(2);
        
      })
    })
  }

  delete(rowId: any) {
    this.promoService.removeSelectedPromoItem(rowId);
  }

  confirm() {
    let savings = this.actualPrice - this.promoPrice;

    if (savings <= 0) {
      return;
    }
    let promoName = ""

    if (this.freeItems.length == 0) {
      promoName = "Get P" + savings + " off when you buy ";
    }
    if (this.freeItems.length != 0) {
      let free = "Get";
      this.freeItems.forEach(freeItem => {
        free = free + " "+freeItem;
      });
      promoName = promoName + free + " for free when you buy";
    }

    let items = ""
    this.promoItemData.forEach(element => {
      if (!element.freebie) {

        if (items != "") {
          items = items + " + " + element.quantity+" " + element.promoItemName;
        } else {
          items = items + " " + element.quantity +" " +  element.promoItemName;
        }
      }
    });

    promoName = promoName + items;

    let newPromo = new PromoData;
    newPromo.promoName = promoName;
    newPromo.promoPrice = this.promoPrice;
    newPromo.active = true;
    newPromo.promoItemList = this.promoItemData;

    const dialogRef = this.dialog.open(PromoDetailsComponent, {
      data: {newPromo: newPromo, actualPrice: this.actualPrice}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.promoService.postPromoData(newPromo).subscribe(result => {
          this.promoService.selectedPromoItemArray = [];
          this.promoService.setSelectedPromoItem([]);
          this.router.navigate(['products/promos']);
        })
      }
    });
   
  }

}
