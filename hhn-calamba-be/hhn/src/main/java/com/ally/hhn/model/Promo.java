package com.ally.hhn.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="promo")
public class Promo {


	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "promo_id", nullable = false)
	private Integer promoId;
	
	@Column(name = "promo_name")
	private String promoName;
	
	@Column(name = "is_active")
	private Boolean isActive;
	
	@Column(name = "promo_price")
	private float promoPrice;
	
	@Column(name = "stocks_left")
	private float stocksLeft;
	
	@Column(name = "included_items")
	private String includedItems;

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

	public float getPromoPrice() {
		return promoPrice;
	}

	public void setPromoPrice(float promoPrice) {
		this.promoPrice = promoPrice;
	}

	public Boolean isActive() {
		return isActive;
	}

	public void setActive(Boolean isActive) {
		this.isActive = isActive;
	}
	
	
	
	public String getIncludedItems() {
		return includedItems;
	}

	public void setIncludedItems(String includedItems) {
		this.includedItems = includedItems;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public float getStocksLeft() {
		return stocksLeft;
	}

	public void setStocksLeft(float stocksLeft) {
		this.stocksLeft = stocksLeft;
	}

	@Override
	public String toString() {
		return "Promo Id: " +promoId+
				"\nPromo Name: "+promoName+ 
				"\nPromo Price "+promoPrice+
				"\nIsActive "+isActive;
	}
	
}
