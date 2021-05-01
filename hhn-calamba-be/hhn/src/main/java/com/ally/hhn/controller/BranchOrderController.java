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
import com.ally.hhn.service.BranchOrderService;

@RestController
@RequestMapping("/branchOrder")
public class BranchOrderController {
	
	@Autowired
	BranchOrderService branchOrderService;
	 
	@GetMapping("/getBranchOrderTableData")
	public ResponseEntity<JSONObject> getBranchOrderTableData(@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "deliveryDate") String sort, @RequestParam(defaultValue = "asc") String order,
			@RequestParam(defaultValue = "5") Integer pageSize,  @RequestParam(defaultValue = "true") String filter) {
		JSONObject response = branchOrderService.getBranchOrderTableData(page, sort, order, pageSize, filter);
		return new ResponseEntity<JSONObject>(response, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/postBranchOrderData")
	public ResponseEntity<JSONObject> postBranchOrderData(@RequestBody BranchOrderDTO branchOrderDTO) {
		branchOrderService.save(branchOrderDTO);
		return getBranchOrderTableData(0, "deliveryDate", "asc", 5, "");
	}
	
	@PostMapping("/deleteBranchOrderData")
	public ResponseEntity<JSONObject> deleteBranchOrderData(@RequestBody BranchOrder branchOrder) {
		branchOrderService.delete(branchOrder);
		return getBranchOrderTableData(0, "deliveryDate", "asc", 5, "true");
	}
	
	@PostMapping("/getBranchOrderItemData")
	public ResponseEntity<JSONObject> getBranchOrderItemData(@RequestBody BranchOrder branchOrder) {
		JSONObject response = branchOrderService.getBranchOrderItemList(branchOrder);
		return new ResponseEntity<JSONObject>(response, new HttpHeaders(), HttpStatus.OK);
		
	}
	
	@PostMapping("/changeStatus")
	public ResponseEntity<JSONObject> changeStatus(@RequestBody BranchOrder branchOrder) {
		branchOrderService.changeStatus(branchOrder);
		return getBranchOrderTableData(0, "deliveryDate", "asc", 5, "true");
		
	}

}
