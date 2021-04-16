package com.ally.hhn.service;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ally.hhn.model.Item;
import com.ally.hhn.repository.ItemRepository;

@Service
public class ItemService {

	@Autowired
	ItemRepository itemRepository;
	
	public JSONObject getItemTableData(Integer pageNumber, String sortColumn, String order, Integer pageSize, String filter) {

		Sort sort;
		if (order.equalsIgnoreCase("ASC")) {
			sort = Sort.by(sortColumn).ascending();
		} else {
			sort = Sort.by(sortColumn).descending();
		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		List<Item> itemList = itemRepository.findByItemName(filter, pageable).getContent();
		int itemCount;
		if(filter.isEmpty()) {
			itemCount = itemRepository.findAll().size();
		}else {
			itemCount = itemRepository.findByItemName(filter).size();
		}
		JSONObject json = new JSONObject();
		json.put("itemList", itemList);
		json.put("itemCount", itemCount);
		return json;
	}
	
	public JSONObject getItemCategories() {
		JSONObject json = new JSONObject();
		json.put("itemCategories", itemRepository.findAllItemCategory());
		return json;
	}
	
	public void save(Item item) {
		itemRepository.save(item);
	}
	
	public void delete(Item item) {
		itemRepository.delete(item);
	}
}
