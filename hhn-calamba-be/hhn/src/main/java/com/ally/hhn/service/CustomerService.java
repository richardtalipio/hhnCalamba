package com.ally.hhn.service;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ally.hhn.model.Customer;
import com.ally.hhn.model.CustomerOrder;
import com.ally.hhn.model.CustomerOrderItem;
import com.ally.hhn.model.Item;
import com.ally.hhn.repository.CustomerOrderItemRepository;
import com.ally.hhn.repository.CustomerOrderRepository;
import com.ally.hhn.repository.CustomerRepository;

@Service
public class CustomerService {
	
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	CustomerOrderRepository customerOrderRepository;
	
	@Autowired
	CustomerOrderItemRepository customerOrderItemRepository;
	
	public JSONObject getCustomerTableData(Integer pageNumber, String sortColumn, String order, Integer pageSize,
			String filter) {

		Sort sort;
		if (order.equalsIgnoreCase("ASC")) {
			sort = Sort.by(sortColumn).ascending();
		} else {
			sort = Sort.by(sortColumn).descending();
		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		List<Customer> customerList = customerRepository.findByCustomerName(filter, pageable).getContent();
		int customerCount;
		if (filter.isEmpty()) {
			customerCount = customerRepository.findAll().size();
		} else {
			customerCount = customerRepository.findByCustomerName(filter).size();
		}
		JSONObject json = new JSONObject();
		json.put("customerList", customerList);
		json.put("customerCount", customerCount);
		return json;
	}
	
	public void save(Customer customer) {
		if(customer.getStatus() == null || customer.getStatus().isEmpty()) {
			customer.setStatus("New Customer");
		}
		customerRepository.save(customer);
	}
	
	public void delete(Customer customer) {
		
		customerRepository.delete(customer);
	}
	
	public JSONObject getCustomerOrderTableData(Integer pageNumber, String sortColumn, String order, Integer pageSize,
			Integer filter) {
		
		Sort sort;
		if (order.equalsIgnoreCase("ASC")) {
			sort = Sort.by(sortColumn).ascending();
		} else {
			sort = Sort.by(sortColumn).descending();
		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		List<CustomerOrder> customerOrderList ;
		int customerOrderCount ;
		if(filter == 0) {
			customerOrderList = customerOrderRepository.findAll(pageable).getContent();
			customerOrderCount = customerOrderRepository.findAll().size();
		}else {
			customerOrderList = customerOrderRepository.findByCustomerId(filter, pageable).getContent();
			customerOrderCount = customerOrderRepository.findByCustomerId(filter).size();
		}
		
		
		
		JSONObject json = new JSONObject();
		json.put("customerOrderList", customerOrderList);
		json.put("customerOrderCount", customerOrderCount);
		return json;
	}
	

}
