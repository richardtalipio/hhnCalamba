import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BranchOrderService{
    constructor(private http: HttpClient) {
    }

    getBranchOrderTableData(sort: string, order: string, page: number, pageSize: number, filter: string): Observable<any> {
        return this.http.get<any>('api/branchOrder/getBranchOrderTableData?sort=' + sort + '&order=' + order + '&page=' + page + '&pageSize=' + pageSize + '&filter=' + filter);
    }

    postBranchOrderData(branchOrderDTO: any): Observable<any>{
        return  this.http.post<any>('api/branchOrder/postBranchOrderData', branchOrderDTO);
    }
}