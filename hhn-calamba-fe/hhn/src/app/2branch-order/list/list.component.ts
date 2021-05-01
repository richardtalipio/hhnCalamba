import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BranchOrderData } from '../../model/branch-order-data';
import { BranchOrderService } from '../../services/branch-order-service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeletePopupComponent } from '../popup/delete-popup/delete-popup.component';
import { ViewOrderComponent } from '../popup/view-order/view-order.component';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: BranchOrderData[] = [];
  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = true;

  displayedColumns: string[] = ['orderDate', 'deliveryDate', 'grandTotal', 'status'];

  excludeClosed: boolean = true;
  constructor(private branchOrderService: BranchOrderService,
    public dialog: MatDialog,
    private router: Router,
    private productService: ProductService) { }

  ngAfterViewInit() {
    this.loadTable();
  }

  loadTable() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.branchOrderService.getBranchOrderTableData(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.excludeClosed);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.branchOrderCount;

          return data.branchOrderList;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => {
        this.dataSource = data;
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      });
  }

  placeNewOrder() {
    this.productService.selectedProductList = [];
    this.productService.setSelectedProduct([]);
    this.router.navigate(['branch-order/new']);
  }

  showBranchOrderDetails(data: BranchOrderData) {
    const dialogRef = this.dialog.open(ViewOrderComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoadingResults = true;
        this.excludeClosed = true;
        this.branchOrderService.boListObs.subscribe({
          next: (data:any) => {
            this.dataSource = data.branchOrderList;
            this.resultsLength = data.branchOrderCount;
            this.paginator.pageIndex = 0;
            this.paginator.pageSize = 5;
            this.sort.active = "orderDate";
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

  excludeCloseOrders(){
  
    return this.branchOrderService.getBranchOrderTableData(
      this.sort.active, this.sort.direction, 0, this.paginator.pageSize, this.excludeClosed)
      .subscribe({
        next: data => {
        this.dataSource = data.branchOrderList;
        this.resultsLength = data.branchOrderCount;
        this.sort.active = "orderDate";
        this.sort.direction = "asc";
        this.paginator.pageIndex = 0;
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
