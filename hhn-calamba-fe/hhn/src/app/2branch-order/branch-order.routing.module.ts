import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { BranchOrderComponent } from "./branch-order.component";
import { NewComponent } from "./new/new.component";

const branchOrderRouting: Routes = [
    {
        path: '', component: BranchOrderComponent, children: [
            { path: 'list', component: ListComponent },
            { path: 'new', component: NewComponent },
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