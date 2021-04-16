package com.ally.hhn.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ally.hhn.model.Stock;
import com.ally.hhn.repository.StockRepository;

@Service
public class StockService {

	@Autowired
	StockRepository stockRepository;
	
	public List<Stock> getAllStock(){
		return stockRepository.findAll();
	}
}
