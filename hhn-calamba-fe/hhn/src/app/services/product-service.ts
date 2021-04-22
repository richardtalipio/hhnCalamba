import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ItemData } from "../model/item-data";
import { PromoData } from "../model/promo-data";

@Injectable({
    providedIn: 'root'
})

export class ProductService{
    constructor(private http: HttpClient) {

    }

    getAllProducts():  Observable<any>{
        return this.http.get<any>('api/product/getAllProducts');
    }


    private selectedItemSource = new BehaviorSubject([]);
    selectedItems = this.selectedItemSource.asObservable();

    setSelectedItems(newSelectedList: ItemData[]) {
        this.selectedItemSource.next(newSelectedList);
    }

    private selectedPromoSource = new BehaviorSubject([]);
    selectedPromos = this.selectedPromoSource.asObservable();

    setselectedPromos(newSelectedPromos: PromoData[]) {
        this.selectedPromoSource.next(newSelectedPromos);
    }
}