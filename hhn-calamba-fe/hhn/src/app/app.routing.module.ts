import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./1home/home.component";
import { NotFoundComponent } from "./6not-found/not-found.component";
import { ProductComponent } from "./4product/product.component";
import { BranchOrderComponent } from "./2branch-order/branch-order.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'branch-order', component: BranchOrderComponent },
  { path: 'products', loadChildren: () => import('./4product/product.module').then(m => m.ProductModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }