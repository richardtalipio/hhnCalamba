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

import com.ally.hhn.model.Customer;
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
			@RequestParam(defaultValue = "5") Integer pageSize,  @RequestParam(defaultValue = "0") Integer filter) {
		JSONObject response = customerService.getCustomerOrderTableData(page, sort, order, pageSize, filter);
		return new ResponseEntity<JSONObject>(response, new HttpHeaders(), HttpStatus.OK);
	}
	
}
