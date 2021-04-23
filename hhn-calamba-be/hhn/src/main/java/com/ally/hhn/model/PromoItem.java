package com.ally.hhn.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="promo_item")
public class PromoItem {
	
	@Id  
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "promo_item_id", nullable = false)
	private Integer promoItemId;
	
	@Column(name = "item_price")
	private float itemPrice;
	
	@Column(name = "quantity")
	private float quantity;
	
	@Column(name = "is_freebie")
	private boolean isFreebie;
	
	@OneToOne
    @JoinColumn(name = "item_id", nullable=false)
    private Item item;
	
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="promo_id")
    private Promo promo;

	public Integer getPromoItemId() {
		return promoItemId;
	}

	public void setPromoItemId(Integer promoItemId) {
		this.promoItemId = promoItemId;
	}

	public float getItemPrice() {
		return itemPrice;
	}

	public void setItemPrice(float itemPrice) {
		this.itemPrice = itemPrice;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public Promo getPromo() {
		return promo;
	}

	public void setPromo(Promo promo) {
		this.promo = promo;
	}

	public float getQuantity() {
		return quantity;
	}

	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	
	public boolean isFreebie() {
		return isFreebie;
	}

	public void setFreebie(boolean isFreebie) {
		this.isFreebie = isFreebie;
	}

	@Override
	public String toString() {
		return "Promo Item: "+item.getItemName()+
				"\nQuantity: "+quantity+
				"\nPromo Price: "+itemPrice;
	}

}
