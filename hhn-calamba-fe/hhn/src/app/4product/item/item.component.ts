import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from 'src/app/services/item-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ItemData } from 'src/app/model/item-data';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ItemDetailsPopupComponent } from '../popup/item-details-popup/item-details-popup.component';
import { DeletePopupComponent } from '../popup/delete-popup/delete-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: ItemData[] = [];
  filter = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = true;

  displayedColumns: string[] = ['itemName', 'category', 'srp', 'delete'];

  constructor(private itemService: ItemService,
    public dialog: MatDialog,
    private router: Router) { }

  ngAfterViewInit() {
    this.loadTable();
  }

  doFilter(value: string) {
    this.filter = value.trim();

    this.itemService.getItemTableData(
      this.sort.active, this.sort.direction, 0, this.paginator.pageSize, this.filter)
      .subscribe({
        next: data => {
        this.dataSource = data.itemList;
        this.resultsLength = data.itemCount;
        this.paginator.pageIndex = 0;
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
          return this.itemService.getItemTableData(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
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

  newItemEvent() {
    const dialogRef = this.dialog.open(ItemDetailsPopupComponent, {
      data: new ItemData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoadingResults = true;
        this.itemService.postItemData(result).subscribe({
          next: data => {
            this.dataSource = data.itemList;
            this.resultsLength = data.itemCount;
            this.paginator.pageIndex = 0;
            this.paginator.pageSize = 5;
            this.sort.active = "itemName";
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

  redirectToDelete(row: any){
    const dialogRef = this.dialog.open(DeletePopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoadingResults = true;
        this.itemService.deleteItemData(row).subscribe({
          next: data => {
            this.dataSource = data.itemList;
            this.resultsLength = data.itemCount;
            this.paginator.pageIndex = 0;
            this.paginator.pageSize = 5;
            this.sort.active = "itemName";
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

  getRecord(row: ItemData){
    const dialogRef = this.dialog.open(ItemDetailsPopupComponent, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoadingResults = true;
        this.itemService.postItemData(result).subscribe({
          next: data => {
            this.dataSource = data.itemList;
            this.resultsLength = data.itemCount;
            this.paginator.pageIndex = 0;
            this.paginator.pageSize = 5;
            this.sort.active = "itemName";
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

  redirectToBundles(){
    this.router.navigate(['products/bundles']);
  }

}
