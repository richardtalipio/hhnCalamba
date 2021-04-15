import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BundleComponent } from "./bundle/bundle.component";
import { ItemComponent } from "./item/item.component";
import { ProductComponent } from "./product.component";

const productCatalogueRoutes: Routes = [
    {
        path: '', component: ProductComponent, children: [
            { path: 'items', component: ItemComponent },
            { path: 'bundles', component: BundleComponent },
            { path: '', redirectTo: 'items', pathMatch: 'full' },
        ]
    }];


@NgModule({
    imports: [
        RouterModule.forChild(productCatalogueRoutes)
    ],
    exports: [
        RouterModule
    ]
})


export class ProductRoutingModule { }