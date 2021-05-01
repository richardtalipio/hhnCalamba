package com.ally.hhn.model;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="customer_order")
public class CustomerOrder {

	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "customer_order_id", nullable = false)
	private Integer customerOrderId;
	
	@Column(name = "order_date")
	private Date orderDate;
	
	@Column(name = "delivery_date")
	private Date deliveryDate;
	
	@Column(name = "grand_total")
	private float grandTotal;
	
	@Column(name = "delivery_method")
	private String deliveryMethod;
	
	@Column(name = "delivery_address")
	private String deliveryAddress;
	
	@Column(name = "payment_method")
	private String paymentMethod;
	
	@Column(name = "profit_earned")
	private float profitEarned;
	
	@Column(name = "delivery_charge")
	private float deliveryCharge;
	
	@Column(name = "special_discount")
	private float specialDiscount;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "is_delivered")
	private boolean isDelivered;
	
	@Column(name = "is_paid")
	private boolean isPaid;
	
	@ManyToOne
	@JoinColumn(name="customer_id")
	private Customer customer;

	public Integer getCustomerOrderId() {
		return customerOrderId;
	}

	public void setCustomerOrderId(Integer customerOrderId) {
		this.customerOrderId = customerOrderId;
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

	public float getProfitEarned() {
		return profitEarned;
	}

	public void setProfitEarned(float profitEarned) {
		this.profitEarned = profitEarned;
	}

	public float getDeliveryCharge() {
		return deliveryCharge;
	}

	public void setDeliveryCharge(float deliveryCharge) {
		this.deliveryCharge = deliveryCharge;
	}

	public float getSpecialDiscount() {
		return specialDiscount;
	}

	public void setSpecialDiscount(float specialDiscount) {
		this.specialDiscount = specialDiscount;
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

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}
	
	
}

