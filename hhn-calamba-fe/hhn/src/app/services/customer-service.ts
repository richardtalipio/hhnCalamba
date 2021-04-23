import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CustomerData } from "../model/customer-data";

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

    private currentCustomer = new BehaviorSubject(new CustomerData);
    currentCustomer$ = this.currentCustomer.asObservable();

    setCurrentCustomer(newCurrentCustomer: CustomerData) {
        this.currentCustomer.next(newCurrentCustomer);
    }
}