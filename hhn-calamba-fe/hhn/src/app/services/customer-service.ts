import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CustomerData } from "../model/customer-data";
import { CustomerOrderData } from "../model/customer-order-data";
import { CustomerOrderItemData } from "../model/customer-order-item-data";
import { ItemData } from "../model/item-data";
import { PromoData } from "../model/promo-data";

@Injectable({
    providedIn: 'root'
})

export class CustomerService{

    constructor(private http: HttpClient) {
    }

    getCustomerTableData(sort: string, order: string, page: number, pageSize: number, filter: string): Observable<any> {
        return this.http.get<any>('api/customer/getCustomerTableData?sort=' + sort + '&order=' + order + '&page=' + page + '&pageSize=' + pageSize + '&filter=' + filter);
    }

    postCustomerData(customer: CustomerData): any{
        return  this.http.post<CustomerData>('api/customer/postCustomerData', customer);
    }

    deleteCustomerData(customer: CustomerData): any{
        return  this.http.post<CustomerData>('api/item/deleteCustomerData', customer);
    }

    getCustomerOrderTableData(sort: string, order: string, page: number, pageSize: number, filter: number): Observable<any> {
        return this.http.get<any>('api/customer/getCustomerOrderTableData?sort=' + sort + '&order=' + order + '&page=' + page + '&pageSize=' + pageSize + '&filter=' + filter);
    }

    postCustomerOrderData(customerOrderDTO: any): Observable<any>{
        return  this.http.post<any>('api/customer/postCustomerOrderData', customerOrderDTO);
    }

    private currentCustomer = new BehaviorSubject(null);
    currentCustomer$ = this.currentCustomer.asObservable();

    setCurrentCustomer(newCurrentCustomer: CustomerData) {
        this.currentCustomer.next(newCurrentCustomer);
    }

    private currentItemList = new BehaviorSubject([]);
    currentItemList$ = this.currentItemList.asObservable();
    setCurrentItemList(newItemList: ItemData[]){
        this.currentItemList.next(newItemList);
    }

    private currentPromoList = new BehaviorSubject([]);
    currentPromoList$ = this.currentPromoList.asObservable();
    setCurrentPromoList(newPromoList: PromoData[]){
        this.currentPromoList.next(newPromoList);
    }

    private addedProduct = new BehaviorSubject(null);
    addedProduct$ =  this.addedProduct.asObservable();
    addProduct(newProduct: CustomerOrderItemData){
        this.addedProduct.next(newProduct);
    }

    private removedProduct = new BehaviorSubject(null);
    removedProduct$ =  this.removedProduct.asObservable();
    removeProduct(newProduct: CustomerOrderItemData){
        this.removedProduct.next(newProduct);
    }

    private closeInvoice = new BehaviorSubject(true);
    closeInvoice$ =  this.closeInvoice.asObservable();
    close(invoice: boolean){
        this.closeInvoice.next(invoice);
    }
}