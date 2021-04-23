import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerData } from 'src/app/model/customer-data';
import { CustomerService } from 'src/app/services/customer-service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { CustomerOrderData } from 'src/app/model/customer-order-data';

@Component({
  selector: 'app-customer-order-list',
  templateUrl: './customer-order-list.component.html',
  styleUrls: ['./customer-order-list.component.css']
})
export class CustomerOrderListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CustomerOrderData[] = [];
  filter = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = true;
  displayedColumns: string[] = ['orderDate', 'deliveryDate', 'grandTotal', 'status', 'delete'];
  constructor(private customerService: CustomerService) { }

  currentCustomer: CustomerData;

  ngAfterViewInit(): void {
    this.customerService.currentCustomer$.subscribe(currentCustomer => {
      this.loadTable(currentCustomer.customerId);
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
          this.resultsLength = data.itemCount;

          return data.itemList;
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

}
