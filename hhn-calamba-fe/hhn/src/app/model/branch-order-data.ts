import { BranchOrderItemData } from "./branch-order-item-data";

export class BranchOrderData{
    branchOrderId;
    orderDate;
    deliveryDate: Date = new Date;
    grandTotal;
    deliveryMethod;
    paymentMethod;
    deliveryCharge;
    status;
    delivered;
    paid;
    branchOrderItemList: BranchOrderItemData[];
}