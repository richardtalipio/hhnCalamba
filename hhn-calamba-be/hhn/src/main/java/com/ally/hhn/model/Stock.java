package com.ally.hhn.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="stock")
public class Stock {

	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "stock_id", nullable = false)
	private Integer stockId;
	
	@Column(name = "purchase_date")
	private Date purchaseDate;
	
	@Column(name = "selling_date")
	private Date sellingDate;
	
	@Column(name = "selling_price")
	private float sellingPrice;
	
	@Column(name = "purchase_price")
	private float purchasePrice;
	
	@Column(name = "stock_status")
	private String stockStatus;
	
	@OneToOne
    @JoinColumn(name = "item_id", nullable=false)
    private Item item;

	public Integer getStockId() {
		return stockId;
	}

	public void setStockId(Integer stockId) {
		this.stockId = stockId;
	}

	public Date getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public Date getSellingDate() {
		return sellingDate;
	}

	public void setSellingDate(Date sellingDate) {
		this.sellingDate = sellingDate;
	}

	public float getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(float purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public String getStockStatus() {
		return stockStatus;
	}

	public void setStockStatus(String stockStatus) {
		this.stockStatus = stockStatus;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public float getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(float sellingPrice) {
		this.sellingPrice = sellingPrice;
	}
	
	
	
}
