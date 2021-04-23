package com.ally.hhn.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="item")
public class Item {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "item_id", nullable = false)
	private Integer itemId;
	
	@Column(name = "item_name")
	private String itemName;
	
	@Column(name = "variant")
	private String variant;
	
	@Column(name = "size")
	private String size;
	
	@Column(name = "category")
	private String category;
	
	@Column(name = "srp")
	private float srp;
	
	@Column(name = "stocks_left")
	private float stocksLeft;

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getVariant() {
		return variant;
	}

	public void setVariant(String variant) {
		this.variant = variant;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public float getSrp() {
		return srp;
	}

	public void setSrp(float srp) {
		this.srp = srp;
	}

	public float getStocksLeft() {
		return stocksLeft;
	}

	public void setStocksLeft(float stocksLeft) {
		this.stocksLeft = stocksLeft;
	}
	
	
	
}
