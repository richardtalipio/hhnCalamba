import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BranchOrderData } from "../model/branch-order-data";

@Injectable({
    providedIn: 'root'
})
export class BranchOrderService{
    constructor(private http: HttpClient) {
    }

    getBranchOrderTableData(sort: string, order: string, page: number, pageSize: number, filter: boolean): Observable<any> {
        return this.http.get<any>('api/branchOrder/getBranchOrderTableData?sort=' + sort + '&order=' + order + '&page=' + page + '&pageSize=' + pageSize + '&filter=' + filter);
    }

    postBranchOrderData(branchOrderDTO: any): Observable<any>{
        return  this.http.post<any>('api/branchOrder/postBranchOrderData', branchOrderDTO);
    }

    deleteBranchOrderData(branchOrderData: BranchOrderData): Observable<any>{
        return  this.http.post<BranchOrderData>('api/branchOrder/deleteBranchOrderData', branchOrderData);
    }

    getBranchOrderItemData(branchOrderData: BranchOrderData): Observable<any>{
        return  this.http.post<BranchOrderData>('api/branchOrder/getBranchOrderItemData', branchOrderData);
    }

    changeStatus(branchOrderData: BranchOrderData): Observable<any>{
        return  this.http.post<BranchOrderData>('api/branchOrder/changeStatus', branchOrderData);
    }

    private boList$ = new BehaviorSubject({});
    boListObs = this.boList$.asObservable();

    setBoList(newBOList:{}) {
        console.log(newBOList);
        this.boList$.next(newBOList);
    }
}