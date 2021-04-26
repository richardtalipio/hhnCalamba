package com.ally.hhn.model;

import java.util.List;

public class CustomerOrderItemDTO {
	
	private Integer customerOrderItemId;
	private float quantity;
	private float sellingPrice;
	private String productType;
	private Integer productCode;
	private boolean isFreebie;
	private List<PromoItem> promoItemList;
	private Object product;
	private String name;
	private float srp;
	private String variant;
	private float itemDiscount;
	
	public CustomerOrderItemDTO(CustomerOrderItem coi) {
		this.customerOrderItemId = coi.getCustomerOrderItemId();
		this.sellingPrice = coi.getSellingPrice();
		this.productCode = coi.getProductCode();
		this.productType = coi.getProductType();
		this.quantity = coi.getQuantity();
		this.isFreebie = coi.isFreebie();
		this.itemDiscount = coi.getItemDiscount();
		
	}
	
	public Integer getCustomerOrderItemId() {
		return customerOrderItemId;
	}
	public void setCustomerOrderItemId(Integer customerOrderItemId) {
		this.customerOrderItemId = customerOrderItemId;
	}
	public float getQuantity() {
		return quantity;
	}
	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	
	public float getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(float sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public Integer getProductCode() {
		return productCode;
	}
	public void setProductCode(Integer productCode) {
		this.productCode = productCode;
	}
	public boolean isFreebie() {
		return isFreebie;
	}
	public void setFreebie(boolean isFreebie) {
		this.isFreebie = isFreebie;
	}
	public List<PromoItem> getPromoItemList() {
		return promoItemList;
	}
	public void setPromoItemList(List<PromoItem> promoItemList) {
		this.promoItemList = promoItemList;
	}
	public Object getProduct() {
		return product;
	}
	public void setProduct(Object product) {
		this.product = product;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getSrp() {
		return srp;
	}
	public void setSrp(float srp) {
		this.srp = srp;
	}
	public String getVariant() {
		return variant;
	}
	public void setVariant(String variant) {
		this.variant = variant;
	}

	public float getItemDiscount() {
		return itemDiscount;
	}

	public void setItemDiscount(float itemDiscount) {
		this.itemDiscount = itemDiscount;
	}
	
	
}
