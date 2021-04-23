import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PromoComponent } from "./promo/promo.component";
import { ItemComponent } from "./item/item.component";
import { ProductComponent } from "./product.component";
import { PromoNewComponent } from "./promo-new/promo-new.component";

const productCatalogueRoutes: Routes = [
    {
        path: '', component: ProductComponent, children: [
            { path: 'items', component: ItemComponent },
            { path: 'promos', component: PromoComponent },
            { path: 'promos/new-promo', component: PromoNewComponent },
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