import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BranchOrderItemData } from 'src/app/model/branch-order-item-data';
import { BranchOrderService } from 'src/app/services/branch-order-service';
import { ChangeStatusComponent } from '../change-status/change-status.component';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  branchOrderitems: BranchOrderItemData[] = [];
  constructor(public dialogRef: MatDialogRef<ViewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private branchOrderService: BranchOrderService,
    private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.branchOrderService.getBranchOrderItemData(this.data).subscribe(result => {
      this.branchOrderitems = result.branchOrderItemList;
    })
  }

  changeStatus(status: String){
    let msg = "";
    if(status === 'PAY'){
      this.data.paid = true;
      msg = "Payment Recorded!";
    }else{
      this.data.delivered = true
      msg = "Order Received!";
    }

    this.branchOrderService.changeStatus(this.data).subscribe(result => {
      this.branchOrderService.setBoList(result);
      this._snackBar.open(msg, "Close");
    })
  }
  
}
