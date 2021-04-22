import { ItemData } from "./item-data";
import { PromoItemData } from "./promo-item-data";

export class PromoData{
    
    promoId;
    promoName;
    promoPrice;
    active;
    includedItems;
    promoItemList: PromoItemData[];
}