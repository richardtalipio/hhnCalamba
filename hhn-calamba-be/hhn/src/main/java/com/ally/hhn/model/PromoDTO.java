package com.ally.hhn.model;

import java.util.ArrayList;
import java.util.List;

public class PromoDTO {
	
	private Integer promoId;
	private String promoName;
	private boolean isActive;
	private float promoPrice;
	private String includedItems;
	private List<PromoItem> promoItemList = new ArrayList<PromoItem>();
	
	public PromoDTO(Promo promo, List<PromoItem> promoItemList) {
		this.promoId = promo.getPromoId();
		this.promoName = promo.getPromoName();
		this.promoPrice = promo.getPromoPrice();
		this.isActive = promo.isActive();
		this.promoItemList.addAll(promoItemList);
	}
	public Integer getPromoId() {
		return promoId;
	}
	public void setPromoId(Integer promoId) {
		this.promoId = promoId;
	}
	public String getPromoName() {
		return promoName;
	}
	public void setPromoName(String promoName) {
		this.promoName = promoName;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	public float getPromoPrice() {
		return promoPrice;
	}
	public void setPromoPrice(float promoPrice) {
		this.promoPrice = promoPrice;
	}
	public String getIncludedItems() {
		return includedItems;
	}
	public void setIncludedItems(String includedItems) {
		this.includedItems = includedItems;
	}
	public List<PromoItem> getPromoItemList() {
		return promoItemList;
	}
	public void setPromoItemList(List<PromoItem> promoItemList) {
		this.promoItemList = promoItemList;
	}
	
	

}
