import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CustomerData } from 'src/app/model/customer-data';
import { CustomerService } from 'src/app/services/customer-service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { CustomerNewComponent } from '../popup/customer-new/customer-new.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: CustomerData[] = [];
  filter = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = true;

  displayedColumns: string[] = ['name', 'status', 'mobileNumber', 'order', 'delete'];

  constructor(private customerService: CustomerService,
    public dialog: MatDialog,
    private router: Router) { }

  ngAfterViewInit() {
    this.loadTable();
  }

  newItemEvent(row: CustomerData) {
    if(row==null){
      row = new CustomerData;
    }
    const dialogRef = this.dialog.open(CustomerNewComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoadingResults = true;
        this.customerService.postCustomerData(result).subscribe({
          next: data => {
            this.dataSource = data.customerList;
            this.resultsLength = data.customerCount;
            this.paginator.pageIndex = 0;
            this.paginator.pageSize = 5;
            this.sort.active = "name";
            this.sort.direction = "asc";
            this.isLoadingResults = false;
            this.isRateLimitReached = false;
          },
          error: error => {
            console.log(error);
          }
        });
      }
    });
  }

  doFilter(value: string) {
    this.filter = value.trim();

    this.customerService.getCustomerTableData(
      this.sort.active, this.sort.direction, 0, this.paginator.pageSize, this.filter)
      .subscribe({
        next: data => {
          this.dataSource = data.customerList;
          this.resultsLength = data.customerCount;
          this.paginator.pageIndex = 0;
          this.sort.active = "name";
          this.sort.direction = "asc";
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
        },
        error: error => {
          console.log(error);
        }
      });
  }

  loadTable() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.customerService.getCustomerTableData(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.customerCount;

          return data.customerList;
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

  redirectToDelete(row: any) {
    
  }

  getRecord(row: CustomerData) {
    this.customerService.setCurrentCustomer(row);
    this.router.navigate(['customer-order/list']);
  }

}
