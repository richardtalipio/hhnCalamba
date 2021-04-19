import { ItemData } from "./item-data";
import { PromoData } from "./promo-data";

export class PromoItemData{
    promoItemId;
    itemPrice;
    quantity;
    item : ItemData;
    promo: PromoData;
}