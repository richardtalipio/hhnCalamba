import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ItemData } from "../model/item-data";

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(private http: HttpClient) {
    }

    getItemTableData(sort: string, order: string, page: number, pageSize: number, filter: string): Observable<any> {
        return this.http.get<any>('api/item/getItemTableData?sort=' + sort + '&order=' + order + '&page=' + page + '&pageSize=' + pageSize + '&filter=' + filter);
    }

    getItemCategories(): Observable<any> {
        return this.http.get<any>('api/item/getItemCategories');
    }

    postItemData(item: ItemData): any{
        return  this.http.post<ItemData>('api/item/postItemData', item);
    }

    deleteItemData(item: ItemData): any{
        return  this.http.post<ItemData>('api/item/deleteItemData', item);
    }

    getAllItems():  Observable<any>{
        return this.http.get<any>('api/item/getAllItems');
    }

    private selectedItemSource = new BehaviorSubject([]);
    selectedItems = this.selectedItemSource.asObservable();

    setSelectedItems(newSelectedList: ItemData[]) {
        this.selectedItemSource.next(newSelectedList);
    }
}