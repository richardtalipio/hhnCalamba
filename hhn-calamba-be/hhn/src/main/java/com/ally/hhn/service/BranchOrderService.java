package com.ally.hhn.service;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ally.hhn.model.BranchOrder;
import com.ally.hhn.model.BranchOrderDTO;
import com.ally.hhn.model.BranchOrderItem;
import com.ally.hhn.model.BranchOrderItemDTO;
import com.ally.hhn.model.Item;
import com.ally.hhn.model.Promo;
import com.ally.hhn.model.PromoItem;
import com.ally.hhn.repository.BranchOrderItemRepository;
import com.ally.hhn.repository.BranchOrderRepository;
import com.ally.hhn.repository.ItemRepository;
import com.ally.hhn.repository.PromoItemRepository;
import com.ally.hhn.repository.PromoRepository;
import com.ally.hhn.utils.Constants;

@Service
public class BranchOrderService {

	@Autowired
	BranchOrderRepository branchOrderRepository;
	@Autowired
	BranchOrderItemRepository branchOrderItemRepository;

	@Autowired
	ItemRepository itemRepository;

	@Autowired
	PromoRepository promoRepository;

	@Autowired
	PromoItemRepository promoItemRepository;

	public JSONObject getBranchOrderTableData(Integer pageNumber, String sortColumn, String order, Integer pageSize,
			String filter) {

		Sort sort;
		if (order.equalsIgnoreCase("ASC")) {
			sort = Sort.by(sortColumn).ascending();
		} else {
			sort = Sort.by(sortColumn).descending();
		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		List<BranchOrder> branchOrderList;
		int branchOrderCount;
		if(Boolean.parseBoolean(filter)) {
			branchOrderList = branchOrderRepository.findAllOpen(pageable).getContent();
			branchOrderCount = branchOrderRepository.findAllOpen().size();
		}else {
			branchOrderList = branchOrderRepository.findAll(pageable).getContent();
			branchOrderCount = branchOrderRepository.findAll().size();
		}


		JSONObject json = new JSONObject();
		json.put("branchOrderList", branchOrderList);
		json.put("branchOrderCount", branchOrderCount);
		return json;
	}

	public void save(BranchOrderDTO branchOrderDTO) {
		BranchOrder bo = getStatus(branchOrderDTO.getBranchOrder());
		final BranchOrder savedBranchOrder = branchOrderRepository.save(bo);

		branchOrderDTO.getBranchOrderItemList().forEach(branchOrderItem -> {
			branchOrderItem.setBranchOrder(savedBranchOrder);
			branchOrderItemRepository.save(branchOrderItem);
		});
	}

	public void delete(BranchOrder branchorder) {
		for (BranchOrderItem branchOrderItem : branchOrderItemRepository
				.findByBranchOrderId(branchorder.getBranchOrderId())) {
			if (branchOrderItem != null)
				branchOrderItemRepository.delete(branchOrderItem);
		}
		branchOrderRepository.delete(branchorder);
	}

	public JSONObject getBranchOrderItemList(BranchOrder branchOrder) {
		List<BranchOrderItemDTO> boiDTOList = new ArrayList<BranchOrderItemDTO>();
		List<BranchOrderItem> boiList = branchOrderItemRepository.findByBranchOrderId(branchOrder.getBranchOrderId());

		boiList.forEach(boi -> {
			BranchOrderItemDTO boiDTO = new BranchOrderItemDTO(boi);
			if (boi.getProductCode() != null) {
				if (boi.getProductType().equalsIgnoreCase(Constants.ITEMS)) {
					Item item = itemRepository.findById(boi.getProductCode()).get();
					boiDTO.setProduct(item);
					boiDTO.setName(item.getItemName() + " " + item.getSize());
					boiDTO.setSrp(item.getSrp());
					boiDTO.setVariant(item.getVariant() != null && !item.getVariant().isEmpty()  ? "(" + item.getVariant() + ")" : "");
				} else {
					Promo promo = promoRepository.findById(boi.getProductCode()).get();
					boiDTO.setSrp(promo.getPromoPrice());
					boiDTO.setProduct(promo);
					List<PromoItem> promoItemList = promoItemRepository.findByPromoId(promo.getPromoId());
					boiDTO.setPromoItemList(promoItemList);
					
				}
				boiDTOList.add(boiDTO);
			}
		});

		JSONObject json = new JSONObject();
		json.put("branchOrderItemList", boiDTOList);
		return json;
	}
	
	public BranchOrder changeStatus(BranchOrder bo) {
		
		return branchOrderRepository.save(getStatus(bo));
	}
	
	private BranchOrder getStatus(BranchOrder bo) {
		if(bo.isPaid() && bo.isDelivered()) {
			bo.setStatus(Constants.CLOSED);
		}else if (bo.isPaid() && !bo.isDelivered()) {
			bo.setStatus(Constants.DELIVERY);
		}else if (!bo.isPaid() && bo.isDelivered()) {
			bo.setStatus(Constants.PAYMENT);
		}else {
			bo.setStatus(Constants.NEW_ORDER);
		}
		return bo;
	}

}
