import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerOrderListComponent } from "./customer-order-list/customer-order-list.component";
import { CustomerOrderComponent } from "./customer-order.component";
import { ItemMenuComponent } from "./item-menu/item-menu.component";


const productCatalogueRoutes: Routes = [
    {
        path: '', component: CustomerOrderComponent, children: [
            { path: 'item-menu', component: ItemMenuComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'list', component: CustomerOrderListComponent},
            { path: '', redirectTo: 'customer', pathMatch: 'full' },
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