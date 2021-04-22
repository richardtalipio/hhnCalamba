package com.ally.hhn.service;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ally.hhn.model.BranchOrder;
import com.ally.hhn.model.BranchOrderDTO;
import com.ally.hhn.model.Item;
import com.ally.hhn.model.Promo;
import com.ally.hhn.model.PromoJSON;
import com.ally.hhn.repository.BranchOrderItemRepository;
import com.ally.hhn.repository.BranchOrderRepository;

@Service
public class BranchOrderService {

	@Autowired
	BranchOrderRepository branchOrderRepository;
	@Autowired
	BranchOrderItemRepository branchOrderItemRepository;
	
	public JSONObject getBranchOrderTableData(Integer pageNumber, String sortColumn, String order, Integer pageSize, String filter) {

		Sort sort;
		if (order.equalsIgnoreCase("ASC")) {
			sort = Sort.by(sortColumn).ascending();
		} else {
			sort = Sort.by(sortColumn).descending();
		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		List<BranchOrder> branchOrderList = branchOrderRepository.findAll(pageable).getContent();
		int branchOrderCount = branchOrderRepository.findAll().size();
		
		JSONObject json = new JSONObject();
		json.put("branchOrderList", branchOrderList);
		json.put("branchOrderCount", branchOrderCount);
		return json;
	}
	
	public void save(BranchOrderDTO branchOrderDTO) {
		final BranchOrder savedBranchOrder = branchOrderRepository.save(branchOrderDTO.getBranchOrder());
		
		branchOrderDTO.getBranchOrderItemList().forEach(branchOrderItem -> {
			branchOrderItem.setBranchOrder(savedBranchOrder);
			branchOrderItemRepository.save(branchOrderItem);
		});
	}
	
}
