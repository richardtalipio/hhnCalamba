import { ItemData } from "./item-data";
import { PromoData } from "./promo-data";

export class PromoItemData{
    promoItemId;
    promoItemName;
    itemPrice;
    quantity: number;
    item : ItemData;
    promo: PromoData;
    
    oldPrice;
    freebie;
}