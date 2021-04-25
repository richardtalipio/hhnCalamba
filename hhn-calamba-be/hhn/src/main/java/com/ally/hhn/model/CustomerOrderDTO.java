package com.ally.hhn.model;

import java.util.List;

public class CustomerOrderDTO {
	
	private Customer customer;
	private CustomerOrder customerOrder;
	private List<CustomerOrderItem> customerOrderItem;
	
	public CustomerOrder getCustomerOrder() {
		return customerOrder;
	}
	public void setCustomerOrder(CustomerOrder customerOrder) {
		this.customerOrder = customerOrder;
	}
	public List<CustomerOrderItem> getCustomerOrderItem() {
		return customerOrderItem;
	}
	public void setCustomerOrderItem(List<CustomerOrderItem> customerOrderItem) {
		this.customerOrderItem = customerOrderItem;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	

}
