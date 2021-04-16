import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BranchOrderComponent } from './2branch-order/branch-order.component';
import { ProductComponent } from './4product/product.component';
import { HomeComponent } from './1home/home.component';
import { ReportComponent } from './5report/report.component';
import { NotFoundComponent } from './6not-found/not-found.component';
import { AppRoutingModule } from './app.routing.module';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'; 
import { MatListModule } from '@angular/material/list';

import { CustomerOrderComponent } from './3customer-order/customer-order.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BranchOrderComponent,
    ProductComponent,
    HomeComponent,
    ReportComponent,
    NotFoundComponent,
    CustomerOrderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    CommonModule
  ],
  exports: [
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
