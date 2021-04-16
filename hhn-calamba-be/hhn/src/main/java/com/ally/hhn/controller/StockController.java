package com.ally.hhn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ally.hhn.model.Stock;
import com.ally.hhn.service.StockService;

@RestController
@RequestMapping("/stock")
public class StockController {
	
	@Autowired
	StockService stockService;
	
	
	@GetMapping("/getAllStock")
	public ResponseEntity<List<Stock>> getAllStock() {
		List<Stock> stockList = stockService.getAllStock();
		return new ResponseEntity<List<Stock>>(stockList, new HttpHeaders(), HttpStatus.OK);
	}
	
	
}
