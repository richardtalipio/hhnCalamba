package com.ally.hhn.model;

import java.util.List;

public class BranchOrderItemDTO {
	
	private Integer branchOrderItemId;
	private float quantity;
	private float dealersPrice;
	private String productType;
	private Integer productCode;
	private boolean isFreebie;
	private List<PromoItem> promoItemList;
	private Object product;
	private String name;
	private float srp;
	private String variant;
	
	public BranchOrderItemDTO(BranchOrderItem boi) {
		this.branchOrderItemId = boi.getBranchOrderItemId();
		this.dealersPrice = boi.getDealersPrice();
		this.productCode = boi.getProductCode();
		this.productType = boi.getProductType();
		this.quantity = boi.getQuantity();
		this.isFreebie = boi.isFreebie();
	}
	
	public Integer getBranchOrderItemId() {
		return branchOrderItemId;
	}
	public void setBranchOrderItemId(Integer branchOrderItemId) {
		this.branchOrderItemId = branchOrderItemId;
	}
	public float getQuantity() {
		return quantity;
	}
	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}
	public float getDealersPrice() {
		return dealersPrice;
	}
	public void setDealersPrice(float dealersPrice) {
		this.dealersPrice = dealersPrice;
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
	
	
}
