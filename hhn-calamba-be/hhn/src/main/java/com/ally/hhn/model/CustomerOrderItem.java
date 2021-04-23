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
@Table(name="customer_order_item")
public class CustomerOrderItem {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "customer_order_item_id", nullable = false)
	private Integer customerOrderItemId;
	
	@Column(name = "quantity")
	private float quantity;
	
	@Column(name = "selling_price")
	private float sellingPrice;
	
	@Column(name = "productType")
	private String productType;
	
	@Column(name = "is_freebie")
	private boolean isFreebie;
	
	@Column(name = "product_code")
	private Integer productCode;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="customer_order_id")
	private CustomerOrder customerOrder;

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

	public boolean isFreebie() {
		return isFreebie;
	}

	public void setFreebie(boolean isFreebie) {
		this.isFreebie = isFreebie;
	}

	public Integer getProductCode() {
		return productCode;
	}

	public void setProductCode(Integer productCode) {
		this.productCode = productCode;
	}

	public CustomerOrder getCustomerOrder() {
		return customerOrder;
	}

	public void setCustomerOrder(CustomerOrder customerOrder) {
		this.customerOrder = customerOrder;
	}
	
	

}
