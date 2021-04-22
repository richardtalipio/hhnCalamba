package com.ally.hhn.model;

import java.util.List;

public class PromoJSON {

	private Promo promo;
	private List<PromoItem> promoItemList;
	
	public PromoJSON (Promo promo, List<PromoItem> promoItemList) {
		this.promo = promo;
		this.promoItemList = promoItemList;
	}
	public Promo getPromo() {
		return promo;
	}
	public void setPromo(Promo promo) {
		this.promo = promo;
	}
	public List<PromoItem> getPromoItemList() {
		return promoItemList;
	}
	public void setPromoItemList(List<PromoItem> promoItemList) {
		this.promoItemList = promoItemList;
	}
	
	
}
