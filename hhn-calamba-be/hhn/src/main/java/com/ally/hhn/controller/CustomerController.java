package com.ally.hhn.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ally.hhn.model.BranchOrder;
import com.ally.hhn.model.BranchOrderDTO;
import com.ally.hhn.model.Customer;
import com.ally.hhn.model.CustomerOrder;
import com.ally.hhn.model.CustomerOrderDTO;
import com.ally.hhn.model.Item;
import com.ally.hhn.service.CustomerService;

@RestController
@RequestMapping("/customer")
public class CustomerController {
	
	@Autowired
	CustomerService customerService;
	
	
	@GetMapping("/getCustomerTableData")
	public ResponseEntity<JSONObject> getCustomerTableData(@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "name") String sort, @RequestParam(defaultValue = "asc") String order,
			@RequestParam(defaultValue = "5") Integer pageSize,  @RequestParam(defaultValue = "") String filter) {
		JSONObject response = customerService.getCustomerTableData(page, sort, order, pageSize, filter);
		return new ResponseEntity<JSONObject>(response, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/postCustomerData")
	public ResponseEntity<JSONObject> postCustomerData(@RequestBody Customer customer) {
		customerService.save(customer);
		return getCustomerTableData(0, "name", "asc", 5, "");
	}

	@PostMapping("/deleteCustomerData")
	public ResponseEntity<JSONObject> deleteCustomerData(@RequestBody Customer customer) {
		customerService.delete(customer);
		return getCustomerTableData(0, "name", "asc", 5, "");
	}
	
	@GetMapping("/getCustomerOrderTableData")
	public ResponseEntity<JSONObject> getCustomerOrderTableData(@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "deliveryDate") String sort, @RequestParam(defaultValue = "asc") String order,
			@RequestParam(defaultValue = "5") Integer pageSize,  @RequestParam(defaultValue = "") String filter) {
		JSONObject response = customerService.getCustomerOrderTableData(page, sort, order, pageSize, filter);
		return new ResponseEntity<JSONObject>(response, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/postCustomerOrderData")
	public ResponseEntity<JSONObject> postCustomerOrderData(@RequestBody CustomerOrderDTO customerOrderDTO) {
		customerService.save(customerOrderDTO);
		return getCustomerOrderTableData(0, "deliveryDate", "asc", 5, "");
	}
	
	@PostMapping("/getCustomerOrderItemData")
	public ResponseEntity<JSONObject> getCustomerOrderItemData(@RequestBody CustomerOrder customerOrder) {
		JSONObject response = customerService.getCustomerOrderItemList(customerOrder);
		return new ResponseEntity<JSONObject>(response, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/changeStatus")
	public ResponseEntity<JSONObject> changeStatus(@RequestBody CustomerOrder customerOrder) {
		CustomerOrder response = customerService.changeStatus(customerOrder);
		return getCustomerOrderTableData(0, "deliveryDate", "asc", 5, "");
		
	}
	
	@PostMapping("/deleteCustomerOrderData")
	public ResponseEntity<JSONObject> deleteCustomerOrderData(@RequestBody CustomerOrder customerOrder) {
		customerService.deleteCustomerOrder(customerOrder);
		return getCustomerOrderTableData(0, "deliveryDate", "asc", 5, String.valueOf(customerOrder.getCustomer().getCustomerId()));
	}
}
