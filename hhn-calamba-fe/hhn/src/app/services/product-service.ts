import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BranchOrderData } from "../model/branch-order-data";
import { BranchOrderItemData } from "../model/branch-order-item-data";
import { ItemData } from "../model/item-data";
import { PromoData } from "../model/promo-data";

@Injectable({
    providedIn: 'root'
})

export class ProductService{
    constructor(private http: HttpClient) {

    }

    getAllProducts(withStock: boolean):  Observable<any>{
        return this.http.get<any>('api/product/getAllProducts?withStock='+withStock);
    }

    selectedProductList: BranchOrderItemData[] = [];
    private selectedProductSource = new BehaviorSubject([]);
    selectedProduct = this.selectedProductSource.asObservable();
    addNewSelectedProduct(newSelectedProduct: BranchOrderItemData) {
        this.selectedProductList.push(newSelectedProduct);
        this.selectedProductSource.next(this.selectedProductList);
    }
    removeSelectedProduct(index){
        this.selectedProductList.splice(index, 1);
        this.selectedProductSource.next(this.selectedProductList);
    }
    setSelectedProduct(array: BranchOrderItemData[] ){
        this.selectedProductSource.next(array);
    }
}