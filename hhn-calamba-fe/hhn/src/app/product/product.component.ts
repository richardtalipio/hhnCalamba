import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  viewList = ["Items", "Bundles"];
  productView = this.viewList[0];

  constructor(private router: Router,
    private _bottomSheet: MatBottomSheet) { }
  
  
  
  ngOnInit(): void {
    this.router.navigate(['products/items']);
  }

  openLink(event: any){
    if(this.viewList[0] == event.value ){
      this.router.navigate(['products/items']);
    }else{
      this.router.navigate(['products/bundles']);
    }
  }

}
