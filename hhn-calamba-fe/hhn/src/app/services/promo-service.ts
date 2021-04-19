import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PromoData } from "../model/promo-data";

@Injectable({
    providedIn: 'root'
})

export class PromoService {

    constructor(private http: HttpClient) {

    }

    getPromoTableData(sort: string, order: string, page: number, pageSize: number, filter: string): Observable<any> {
        return this.http.get<any>('api/promo/getPromoTableData?sort=' + sort + '&order=' + order + '&page=' + page + '&pageSize=' + pageSize + '&filter=' + filter);
    }

    postPromoData(promoDTO: any): Observable<any>{
        return  this.http.post<PromoData>('api/promo/postPromoData', promoDTO);
    }

    deletePromoData(promo: PromoData): Observable<any>{
        return  this.http.post<PromoData>('api/promo/deletePromoData', promo);
    }

    togglePromo(promo: PromoData){
        return  this.http.post<PromoData>('api/promo/togglePromo', promo);
    }
}