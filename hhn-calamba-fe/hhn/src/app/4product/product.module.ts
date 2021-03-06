import { NgModule } from "@angular/core";
import { ItemComponent } from './item/item.component';
import { PromoComponent } from './promo/promo.component';
import { ProductRoutingModule } from "./product.routing.module";
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
import { ItemDetailsPopupComponent } from './popup/item-details-popup/item-details-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeletePopupComponent } from './popup/delete-popup/delete-popup.component';
import { MatStepperModule }  from '@angular/material/stepper'; 
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PromoNewComponent } from './promo-new/promo-new.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PromoDraftComponent } from './promo-draft/promo-draft.component';
import { PromoConfigComponent } from './popup/promo-config/promo-config.component';
import { PromoDetailsComponent } from './popup/promo-details/promo-details.component';
import { PromoViewComponent } from './popup/promo-view/promo-view.component';

@NgModule({
    imports: [ProductRoutingModule,
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
        MatCheckboxModule
        
    ],
    declarations: [ItemComponent, PromoComponent, ItemDetailsPopupComponent, DeletePopupComponent, PromoNewComponent, PromoDraftComponent, PromoConfigComponent, PromoDetailsComponent, PromoViewComponent],
    exports: []
})
export class ProductModule { }