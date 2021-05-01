package com.ally.hhn.controller;

import java.util.List;

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
import com.ally.hhn.service.ItemService;

@RestController
@RequestMapping("/item")
public class ItemController {

	@Autowired
	ItemService itemService;

	@GetMapping("/getItemTableData")
	public ResponseEntity<JSONObject> getItemTableData(@RequestParam(defaultValue = "0") Integer page,
			@RequestParam(defaultValue = "itemName") String sort, @RequestParam(defaultValue = "asc") String order,
			@RequestParam(defaultValue = "5") Integer pageSize,  @RequestParam(defaultValue = "") String filter) {
		JSONObject response = itemService.getItemTableData(page, sort, order, pageSize, filter);
		return new ResponseEntity<JSONObject>(response, new HttpHeaders(), HttpStatus.OK);
	}
	
	@GetMapping("/getItemCategories")
	public ResponseEntity<JSONObject> loadAllItemCategories() {
		JSONObject response = itemService.getItemCategories();
		return new ResponseEntity<JSONObject>(response, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/postItemData")
	public ResponseEntity<JSONObject> postItemData(@RequestBody Item item) {
		itemService.save(item);
		return getItemTableData(0, "itemName", "asc", 5, "");
	}
	
	@PostMapping("/deleteItemData")
	public ResponseEntity<JSONObject> deleteItemData(@RequestBody Item item) {
		itemService.delete(item);
		return getItemTableData(0, "itemName", "asc", 5, "");
	}
	
	@GetMapping("/getAllItems")
	public List<Item> getAllItems(@RequestParam(defaultValue = "false") String withStock){
		return itemService.getAllItems(Boolean.parseBoolean(withStock));
	}
}
