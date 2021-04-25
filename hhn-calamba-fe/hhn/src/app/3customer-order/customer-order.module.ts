import { NgModule } from "@angular/core";
import { CustomerOrderRoutingModule } from "./customer-order.routing.module";
import { MatSelectModule } from '@angular/material/select'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule }  from '@angular/material/stepper'; 
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomerComponent } from './customer/customer.component';
import { CustomerNewComponent } from './popup/customer-new/customer-new.component';
import { CustomerOrderListComponent } from './customer-order-list/customer-order-list.component';
import { NewComponent } from './new/new.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ItemConfigComponent } from './popup/item-config/item-config.component';
import { ItemConfirmComponent } from './popup/item-confirm/item-confirm.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
    imports: [CustomerOrderRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatSortModule,
        CommonModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatStepperModule,
        MatChipsModule,
        MatSlideToggleModule,
        MatCardModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMasonryModule
        
    ],
    declarations: [CustomerComponent, CustomerNewComponent, CustomerOrderListComponent, NewComponent, InvoiceComponent, ItemConfigComponent, ItemConfirmComponent],
    exports: []
})
export class CustomerOrderModule { }