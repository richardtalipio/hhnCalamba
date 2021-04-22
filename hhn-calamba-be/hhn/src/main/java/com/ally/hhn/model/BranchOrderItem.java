package com.ally.hhn.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="branch_order_item")
public class BranchOrderItem {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "branch_order_item_id", nullable = false)
	private Integer branchOrderItemId;
	
	@Column(name = "quantity")
	private float quantity;
	
	@Column(name = "dealers_price")
	private float dealersPrice;
	
	@Column(name = "productType")
	private String productType;
	
	@Column(name = "is_freebie")
	private boolean isFreebie;
	
	@Column(name = "product_code")
	private Integer productCode;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="branch_order_id", nullable=false)
	private BranchOrder branchOrder;

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

	public BranchOrder getBranchOrder() {
		return branchOrder;
	}

	public void setBranchOrder(BranchOrder branchOrder) {
		this.branchOrder = branchOrder;
	}

	public boolean isFreebie() {
		return isFreebie;
	}

	public void setFreebie(boolean isFreebie) {
		this.isFreebie = isFreebie;
	}
	
	
	
}
