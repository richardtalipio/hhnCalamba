import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BranchOrderListComponent } from "./branch-order-list/branch-order-list.component";
import { BranchOrderPricesComponent } from "./branch-order-prices/branch-order-prices.component";
import { BranchOrderComponent } from "./branch-order.component";
import { NewBranchOrderComponent } from "./new-branch-order/new-branch-order.component";

const branchOrderRouting: Routes = [
    {
        path: '', component: BranchOrderComponent, children: [
            { path: 'list', component: BranchOrderListComponent },
            { path: 'new', component: NewBranchOrderComponent },
            { path: 'prices', component: BranchOrderPricesComponent },
            { path: '', redirectTo: 'list', pathMatch: 'full' },
        ]
    }];

@NgModule({
    imports: [
        RouterModule.forChild(branchOrderRouting)
    ],
    exports: [
        RouterModule
    ]
})

export class BranchOrderRoutingModule { }