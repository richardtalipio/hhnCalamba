package com.ally.hhn.controller;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ally.hhn.service.ItemService;
import com.ally.hhn.service.PromoService;

@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	ItemService itemService;
	
	@Autowired
	PromoService promoService;
	
	@GetMapping("/getAllProducts")
	public HashMap<String, Object> getProducts(@RequestParam(defaultValue = "false") boolean withStock){
		HashMap<String, Object> products = new HashMap<String, Object>();
		products.put("items", itemService.getAllItems(withStock));
		products.put("promos", promoService.getAllPromos(withStock));
		return products;
	}

}
