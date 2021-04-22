import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BranchOrderData } from '../../model/branch-order-data';
import { BranchOrderService } from '../../services/branch-order-service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { BranchOrderDetailsComponent } from './popup/branch-order-details/branch-order-details.component';

@Component({
  selector: 'app-branch-order-list',
  templateUrl: './branch-order-list.component.html',
  styleUrls: ['./branch-order-list.component.css']
})
export class BranchOrderListComponent implements  AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: BranchOrderData[] = [];
  filter = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = true;

  displayedColumns: string[] = ['orderDate', 'deliveryDate', 'grandTotal', 'status', 'delete'];

  constructor(private branchOrderService: BranchOrderService,
    public dialog: MatDialog,
    private router: Router) { }

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
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
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

  placeNewOrder(){
    this.router.navigate(['branch-order/new']);
  }


}
