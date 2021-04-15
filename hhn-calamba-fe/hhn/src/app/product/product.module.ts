import { NgModule } from "@angular/core";
import { ItemComponent } from './item/item.component';
import { BundleComponent } from './bundle/bundle.component';
import { ProductRoutingModule } from "./product.routing.module";
import { MatSelectModule } from '@angular/material/select'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 

@NgModule({
    imports: [ProductRoutingModule,
        MatSelectModule,
        MatFormFieldModule
    ],
    declarations: [ItemComponent, BundleComponent],
    exports: []
})
export class ProductModule { }