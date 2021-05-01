import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerData } from 'src/app/model/customer-data';
import { CustomerOrderItemData } from 'src/app/model/customer-order-item-data';
import { CustomerService } from 'src/app/services/customer-service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  customerOrderItems: CustomerOrderItemData[] = [];
  customer: CustomerData;
  isDiscounted: boolean = false;

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  constructor(public dialogRef: MatDialogRef<ViewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.customerService.currentCustomer$.subscribe(customer => {
      this.customer = customer;
    })
    this.customerService.getCustomerOrderItemData(this.data).subscribe(result => {
      this.customerOrderItems = result.customerOrderItemDataList;
      this.customerOrderItems.forEach(element => {
        console.log(element)
        if((element.itemDiscount !== 0 && element.itemDiscount !== undefined) || element.freebie){
          this.isDiscounted = true;
          return;
        }
      });
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

    this.customerService.changeStatus(this.data).subscribe(result => {
      this.customerService.setCoList(result);
      this._snackBar.open(msg, "Close");
    })
  }

  deleteCustomerOrder(){
    let msg = "This Order has been cancelled"
    this.customerService.deleteCustomerOrderData(this.data).subscribe(result =>{
      this.customerService.setCoList(result);
      this._snackBar.open(msg, "Close");
    })
  }

  printSalesInvoice(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'salesInvoice_'+this.customer.name+'.png';
      this.downloadLink.nativeElement.click();
    });
  }
}
