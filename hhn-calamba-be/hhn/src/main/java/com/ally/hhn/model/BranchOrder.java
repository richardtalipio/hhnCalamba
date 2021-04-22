package com.ally.hhn.model;


import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="branch_order")
public class BranchOrder {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "branch_order_id", nullable = false)
	private Integer branchOrderId;
	
	@Column(name = "order_date")
	private Date orderDate;
	
	@Column(name = "delivery_date")
	private Date deliveryDate;
	
	@Column(name = "grand_total")
	private float grandTotal;
	
	@Column(name = "delivery_method")
	private String deliveryMethod;
	
	@Column(name = "payment_method")
	private String paymentMethod;
	
	@Column(name = "delivery_charge")
	private float deliveryCharge;	
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "is_delivered")
	private boolean isDelivered;
	
	@Column(name = "is_paid")
	private boolean isPaid;

	public Integer getBranchOrderId() {
		return branchOrderId;
	}

	public void setBranchOrderId(Integer branchOrderId) {
		this.branchOrderId = branchOrderId;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Date deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public float getGrandTotal() {
		return grandTotal;
	}

	public void setGrandTotal(float grandTotal) {
		this.grandTotal = grandTotal;
	}

	public String getDeliveryMethod() {
		return deliveryMethod;
	}

	public void setDeliveryMethod(String deliveryMethod) {
		this.deliveryMethod = deliveryMethod;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public float getDeliveryCharge() {
		return deliveryCharge;
	}

	public void setDeliveryCharge(float deliveryCharge) {
		this.deliveryCharge = deliveryCharge;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public boolean isDelivered() {
		return isDelivered;
	}

	public void setDelivered(boolean isDelivered) {
		this.isDelivered = isDelivered;
	}

	public boolean isPaid() {
		return isPaid;
	}

	public void setPaid(boolean isPaid) {
		this.isPaid = isPaid;
	}
	
	
}
