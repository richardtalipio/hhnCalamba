import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerData } from 'src/app/model/customer-data';
import { CustomerService } from 'src/app/services/customer-service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of, Subscription } from 'rxjs';
import { CustomerOrderData } from 'src/app/model/customer-order-data';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderComponent } from '../popup/view-order/view-order.component';

@Component({
  selector: 'app-customer-order-list',
  templateUrl: './customer-order-list.component.html',
  styleUrls: ['./customer-order-list.component.css']
})
export class CustomerOrderListComponent implements AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CustomerOrderData[] = [];
  filter = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = true;
  displayedColumns: string[] = ['orderDate', 'deliveryDate', 'grandTotal', 'status'];
  currentCustomer$: Subscription;

  constructor(private customerService: CustomerService,
    private router: Router,
    private productService: ProductService,
    public dialog: MatDialog) { }

  currentCustomer: CustomerData;

  ngAfterViewInit(): void {
    this.currentCustomer$ = this.customerService.currentCustomer$.subscribe(currentCustomer => {
      if (currentCustomer != null) {
        this.loadTable(currentCustomer.customerId);
      }

    })
  }

  loadTable(id: number) {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.customerService.getCustomerOrderTableData(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, id);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.customerOrderCount;

          return data.customerOrderList;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => {
        this.dataSource = data;
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      });
  }

  placeNewOrder() {
    this.productService.getAllProducts(false).subscribe(allProducts => {
      this.customerService.setCurrentItemList(allProducts.items);
      this.customerService.setCurrentPromoList(allProducts.promos);
      this.router.navigate(['customer-order/new']);
    })

  }

  ngOnDestroy() {
    this.currentCustomer$.unsubscribe();
  }

  showCustomerOrderDetails(data: CustomerOrderData) {
    const dialogRef = this.dialog.open(ViewOrderComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoadingResults = true;
        this.customerService.coListObs.subscribe({
          next: (data:any) => {
            this.dataSource = data.customerOrderList;
            this.resultsLength = data.customerOrderCount;
            this.paginator.pageIndex = 0;
            this.paginator.pageSize = 5;
            this.sort.active = "deliveryDate";
            this.sort.direction = "asc";
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
          },
          error: error => {
            console.log(error);
          }
        });
      }
    })
  }
}
