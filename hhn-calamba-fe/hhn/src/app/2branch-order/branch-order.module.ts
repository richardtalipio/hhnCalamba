import { NgModule } from "@angular/core";
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BranchOrderRoutingModule } from "./branch-order.routing.module";
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InvoiceComponent } from './invoice/invoice.component';
import { ItemConfigComponent } from './popup/item-config/item-config.component';
import { ItemConfirmComponent } from './popup/item-confirm/item-confirm.component';
import { DeletePopupComponent } from './popup/delete-popup/delete-popup.component';
import { ViewOrderComponent } from './popup/view-order/view-order.component';
import { ChangeStatusComponent } from './popup/change-status/change-status.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [BranchOrderRoutingModule,
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
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        
    ],
    declarations: [DeletePopupComponent, NewComponent, ListComponent, InvoiceComponent, ItemConfigComponent, ItemConfirmComponent, ViewOrderComponent, ChangeStatusComponent],
    exports: []

})
export class BranchOrderModule { }