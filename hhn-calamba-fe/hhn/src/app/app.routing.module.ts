import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./1home/home.component";
import { NotFoundComponent } from "./6not-found/not-found.component";
import { ProductComponent } from "./4product/product.component";
import { BranchOrderComponent } from "./2branch-order/branch-order.component";
import { CustomerOrderComponent } from "./3customer-order/customer-order.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'branch-order', loadChildren: () => import('./2branch-order/branch-order.module').then(m => m.BranchOrderModule)  },
  { path: 'customer-order', loadChildren: () => import('./3customer-order/customer-order.module').then(m => m.CustomerOrderModule)  },
  { path: 'products', loadChildren: () => import('./4product/product.module').then(m => m.ProductModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }