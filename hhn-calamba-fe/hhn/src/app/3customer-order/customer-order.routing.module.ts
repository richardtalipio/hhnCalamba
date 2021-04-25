import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerComponent } from "./customer/customer.component";
import { CustomerOrderListComponent } from "./customer-order-list/customer-order-list.component";
import { CustomerOrderComponent } from "./customer-order.component";
import { NewComponent } from "./new/new.component";


const productCatalogueRoutes: Routes = [
    {
        path: '', component: CustomerOrderComponent, children: [
            { path: 'customer', component: CustomerComponent },
            { path: 'list', component: CustomerOrderListComponent},
            { path: 'new', component: NewComponent},
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