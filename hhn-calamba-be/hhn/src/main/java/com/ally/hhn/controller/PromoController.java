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

import com.ally.hhn.model.Item;
import com.ally.hhn.model.Promo;
import com.ally.hhn.model.PromoDTO;
import com.ally.hhn.service.PromoService;

@RestController
@RequestMapping("/promo")
public class PromoController {

	@Autowired
	PromoService promoService;
	
	
	@GetMapping("/getPromoTableData")
	public ResponseEntity<JSONObject> getPromoTableData(@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "promoName") String sort, @RequestParam(defaultValue = "asc") String order,
			@RequestParam(defaultValue = "5") Integer pageSize,  @RequestParam(defaultValue = "") String filter) {
		JSONObject response = promoService.getPromoTableData(page, sort, order, pageSize, filter);
		return new ResponseEntity<JSONObject>(response, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/postPromoData")
	public ResponseEntity<JSONObject> postPromoData(@RequestBody PromoDTO promoDTO) {
		promoService.save(promoDTO);
		return getPromoTableData(0, "promoName", "asc", 5, "");
	}
	
	@PostMapping("/deletePromoData")
	public ResponseEntity<JSONObject> deletePromoData(@RequestBody Promo promo) {
		promoService.delete(promo);
		return getPromoTableData(0, "promoName", "asc", 5, "");
	}
	
	@PostMapping("/togglePromo")
	public ResponseEntity togglePromo(@RequestBody Promo promo) {
		try {
			promoService.save(promo);
			return new ResponseEntity<JSONObject>(new HttpHeaders(), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<JSONObject>(new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/getPromoItemListData")
	public ResponseEntity<JSONObject> getPromoItemListData(@RequestBody Promo promo) {
		JSONObject response = promoService.getPromoItemList(promo);
		return new ResponseEntity<JSONObject>(response, new HttpHeaders(), HttpStatus.OK);
	}
}
