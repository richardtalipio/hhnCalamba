import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerOrderItemData } from 'src/app/model/customer-order-item-data';
import { CustomerService } from 'src/app/services/customer-service';
import { ItemConfirmComponent } from '../popup/item-confirm/item-confirm.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit, OnDestroy {

  constructor(private customerService: CustomerService,
    public dialog: MatDialog,
    private router: Router,) { }

  customerOrderItemLists: CustomerOrderItemData[] = [];
  productSubscription$: Subscription;
  grandTotal: any = 0;
  currentCustomer;
  currentCustomer$;

  ngOnInit(): void {
    this.productSubscription$ = this.customerService.addedProduct$.subscribe(newProduct => {
      if (newProduct !== null && newProduct !== undefined) {
        this.customerOrderItemLists.push(newProduct);
        if (!newProduct.freebie) {
          this.grandTotal = (parseFloat(this.grandTotal) + parseFloat(newProduct.sellingPrice)).toFixed(2);
        }
      }
    });

    this.currentCustomer$ = this.customerService.currentCustomer$.subscribe(customer => {
      this.currentCustomer = customer;
    })

  }

  delete(rowId: any) {
    let deleted: CustomerOrderItemData = this.customerOrderItemLists.splice(rowId, 1)[0];
    if (!deleted.freebie) {
      this.grandTotal = (parseFloat(this.grandTotal) - parseFloat(deleted.sellingPrice)).toFixed(2);
    }
    this.customerService.removeProduct(deleted);
    if (this.customerOrderItemLists.length === 0) {
      this.customerService.close(true);
    } else {
      this.customerService.close(false);
    }

  }

  confirm() {
    const dialogRef = this.dialog.open(ItemConfirmComponent, {
      data: this.grandTotal
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let customerOrder = {
          customer: this.currentCustomer,
          customerOrder: result,
          customerOrderItem: this.customerOrderItemLists
        };
        this.customerService.postCustomerOrderData(customerOrder).subscribe(result => {
          this.router.navigate(['customer-order/list']);
        });
      }
    });
  }

  ngOnDestroy() {
    this.customerService.addProduct(null);
    this.productSubscription$.unsubscribe();
  }

}
