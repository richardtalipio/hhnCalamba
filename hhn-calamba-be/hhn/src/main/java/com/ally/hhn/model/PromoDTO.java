package com.ally.hhn.model;

import java.util.List;

public class PromoDTO {

	private Promo promo;
	private List<PromoItem> promoItemList;
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
