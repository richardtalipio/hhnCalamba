import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BranchOrderItemData } from 'src/app/model/branch-order-item-data';
import { BranchOrderService } from 'src/app/services/branch-order-service';
import { ProductService } from 'src/app/services/product-service';
import { ItemConfirmComponent } from '../popup/item-confirm/item-confirm.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private router: Router,
    private branchOrderService: BranchOrderService) { }

  branchOrderitems: BranchOrderItemData[];
  selectedProduct$: Subscription;
  grandTotal ;
  ngOnInit(): void {
    this.selectedProduct$ = this.productService.selectedProduct.subscribe((selectedProductList: BranchOrderItemData[]) => {
      this.grandTotal = 0;
      this.branchOrderitems = selectedProductList;
      selectedProductList.forEach(product => {
        if(!product.freebie){
          this.grandTotal = (parseFloat(this.grandTotal)+ parseFloat(product.dealersPrice)).toFixed(2);
        }
      })
    })
  }

  delete(rowId: any){
    this.productService.removeSelectedProduct(rowId);
  }

  confirm(){
    const dialogRef = this.dialog.open(ItemConfirmComponent, {
      data: this.grandTotal
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let branchOrder = {branchOrder: result, branchOrderItemList: this.branchOrderitems};
        this.branchOrderService.postBranchOrderData(branchOrder).subscribe(result => {
          this.productService.selectedProductList = [];
          this.productService.setSelectedProduct([]);
          this.router.navigate(['branch-order/list']);
        })
        
      }
    });
  }

  ngOnDestroy(){
    this.selectedProduct$.unsubscribe();
  }

}
