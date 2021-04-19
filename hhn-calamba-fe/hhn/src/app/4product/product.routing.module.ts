import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PromoComponent } from "./promo/promo.component";
import { ItemComponent } from "./item/item.component";
import { ProductComponent } from "./product.component";
import { PromoDetailsComponent } from "./popup/promo-details/promo-details.component";

const productCatalogueRoutes: Routes = [
    {
        path: '', component: ProductComponent, children: [
            { path: 'items', component: ItemComponent },
            { path: 'promos', component: PromoComponent },
            { path: '', redirectTo: 'promos', pathMatch: 'full' },
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