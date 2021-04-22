import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerOrderComponent } from "./customer-order.component";
import { ItemMenuComponent } from "./item-menu/item-menu.component";


const productCatalogueRoutes: Routes = [
    {
        path: '', component: CustomerOrderComponent, children: [
            { path: 'item-menu', component: ItemMenuComponent },
            
            { path: '', redirectTo: 'item-menu', pathMatch: 'full' },
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


export class CustomerOrderRoutingModule { }