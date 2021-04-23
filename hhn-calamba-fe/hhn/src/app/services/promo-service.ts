import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { PromoData } from "../model/promo-data";
import { PromoItemData } from "../model/promo-item-data";

@Injectable({
    providedIn: 'root'
})

export class PromoService {

    constructor(private http: HttpClient) {

    }

    getPromoTableData(sort: string, order: string, page: number, pageSize: number, filter: string): Observable<any> {
        return this.http.get<any>('api/promo/getPromoTableData?sort=' + sort + '&order=' + order + '&page=' + page + '&pageSize=' + pageSize + '&filter=' + filter);
    }

    postPromoData(promoData: any): Observable<any>{
        return  this.http.post<PromoData>('api/promo/postPromoData', promoData);
    }

    deletePromoData(promo: PromoData): Observable<any>{
        return  this.http.post<PromoData>('api/promo/deletePromoData', promo);
    }

    togglePromo(promo: PromoData){
        return  this.http.post<PromoData>('api/promo/togglePromo', promo);
    }

    selectedPromoItemArray: PromoItemData[] = [];
    private selectedPromoItem$ = new BehaviorSubject([]);
    selectedPromoItemObs = this.selectedPromoItem$.asObservable();
    addNewSelectedPromoItem(newSelectedPromoItem: PromoItemData) {
        this.selectedPromoItemArray.push(newSelectedPromoItem);
        this.selectedPromoItem$.next(this.selectedPromoItemArray);
    }
    removeSelectedPromoItem(index){
        this.selectedPromoItemArray.splice(index, 1);
        this.selectedPromoItem$.next(this.selectedPromoItemArray);
    }
    setSelectedPromoItem(array: PromoItemData[] ){
        this.selectedPromoItem$.next(array);
    }

    getPromoItemListData(promoData: PromoData): Observable<any>{
        return  this.http.post<PromoData>('api/promo/getPromoItemListData', promoData);
    }
}