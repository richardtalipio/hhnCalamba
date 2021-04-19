package com.ally.hhn.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;
import javax.persistence.Transient;


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
	private boolean isActive;
	
	@Column(name = "promo_price")
	private float promoPrice;

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

	public float getPromo_price() {
		return promoPrice;
	}

	public void setPromo_price(float promo_price) {
		this.promoPrice = promo_price;
	}

	public float getPromoPrice() {
		return promoPrice;
	}

	public void setPromoPrice(float promoPrice) {
		this.promoPrice = promoPrice;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
	@Override
	public String toString() {
		return "Promo Id: " +promoId+
				"\nPromo Name: "+promoName+ 
				"\nPromo Price "+promoPrice+
				"\nIsActive "+isActive;
	}
	
}
