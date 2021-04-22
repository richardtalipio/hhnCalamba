import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { PromoData } from 'src/app/model/promo-data';
import { PromoService } from 'src/app/services/promo-service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { DeletePopupComponent } from '../popup/delete-popup/delete-popup.component';
import { ItemService } from 'src/app/services/item-service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: PromoData[] = [];
  filter = "";
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = true;

  displayedColumns: string[] = ['promoName', 'promoPrice', 'active', 'delete'];

  constructor(private promoService: PromoService, private itemService: ItemService,
    public dialog: MatDialog,
    private router: Router) { }

  ngAfterViewInit() {
    this.loadTable();
  }

  redirectToItems() {
    this.router.navigate(['products/items']);
  }

  deletePromo(row: PromoData) {
    const dialogRef = this.dialog.open(DeletePopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoadingResults = true;
        this.promoService.deletePromoData(row).subscribe({
          next: data => {
            this.dataSource = data.promoList;
            this.resultsLength = data.promoCount;
            this.paginator.pageIndex = 0;
            this.paginator.pageSize = 5;
            this.sort.active = "promoName";
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

  openPromoDetails() {
    this.itemService.setSelectedItems([]);
    this.router.navigate(['products/promos/new-promo']);
    // const dialogRef = this.dialog.open(PromoDetailsComponent, {
    //   data: new PromoData
    // });

    // dialogRef.afterClosed().subscribe(promoDTO => {
    //   if (promoDTO) {
    //     this.isLoadingResults = true;
    //     this.promoService.postPromoData(promoDTO).subscribe({
    //       next: data => {
    //         this.dataSource = data.promoList;
    //         this.resultsLength = data.promoCount;
    //         this.paginator.pageIndex = 0;
    //         this.paginator.pageSize = 5;
    //         this.sort.active = "promoName";
    //         this.sort.direction = "asc";
    //         this.isLoadingResults = false;
    //         this.isRateLimitReached = false;
    //       },
    //       error: error => {
    //         console.log(error);
    //       }
    //     });
    //   }
    // });


  }

  loadTable() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.promoService.getPromoTableData(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.promoCount;

          return data.promoList;
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

  doFilter(value: string) {
    this.filter = value.trim();

    this.promoService.getPromoTableData(
      this.sort.active, this.sort.direction, 0, this.paginator.pageSize, this.filter)
      .subscribe({
        next: data => {
          this.dataSource = data.promoList;
          this.resultsLength = data.promoCount;
          this.paginator.pageIndex = 0;
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
        },
        error: error => {
          console.log(error);
        }
      });
  }

  onToggle(row: PromoData){
    this.promoService.togglePromo(row).subscribe({
      next: data => {
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
