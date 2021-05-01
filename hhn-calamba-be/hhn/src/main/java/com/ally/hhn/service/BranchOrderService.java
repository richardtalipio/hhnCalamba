package com.ally.hhn.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
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
import com.ally.hhn.model.Stock;
import com.ally.hhn.repository.BranchOrderItemRepository;
import com.ally.hhn.repository.BranchOrderRepository;
import com.ally.hhn.repository.ItemRepository;
import com.ally.hhn.repository.PromoItemRepository;
import com.ally.hhn.repository.PromoRepository;
import com.ally.hhn.repository.StockRepository;
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
	
	@Autowired
	StockRepository stockRepository;

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
			createStock(bo);
		}else if (bo.isPaid() && !bo.isDelivered()) {
			bo.setStatus(Constants.DELIVERY);
		}else if (!bo.isPaid() && bo.isDelivered()) {
			bo.setStatus(Constants.PAYMENT);
		}else {
			bo.setStatus(Constants.NEW_ORDER);
		}
		return bo;
	}
	
	private void createStock(BranchOrder bo) {
		List<BranchOrderItem> boiList = branchOrderItemRepository.findByBranchOrderId(bo.getBranchOrderId());

		boiList.forEach(boi -> {
			if (boi.getProductCode() != null) {
				if (boi.getProductType().equalsIgnoreCase(Constants.ITEMS)) {
					Item item = itemRepository.findById(boi.getProductCode()).get();
					for(int i=0; i<boi.getQuantity(); i++) {
						Stock newStock = new Stock();
						newStock.setStockStatus(Constants.AVAILABLE);
						newStock.setItem(item);
						newStock.setPurchaseDate(bo.getDeliveryDate());
						if(boi.isFreebie()) {
							newStock.setPurchasePrice(0);
						}else {
							newStock.setPurchasePrice(item.getSrp() - (item.getSrp()*Constants.DEALER_RATE));
						}
						stockRepository.save(newStock);
					}
					float stock = item.getStocksLeft() + boi.getQuantity();
					item.setStocksLeft(stock);
					itemRepository.save(item);
				} else {
					Promo promo = promoRepository.findById(boi.getProductCode()).get();
					List<PromoItem> promoItemList = promoItemRepository.findByPromoId(promo.getPromoId());
					
					promoItemList.forEach(promoItem -> {
						Item item = itemRepository.findById(promoItem.getItem().getItemId()).get();
						float neededStock = boi.getQuantity() * promoItem.getQuantity();
						for(int i=0; i<neededStock; i++) {
							Stock newStock = new Stock();
							newStock.setStockStatus(Constants.AVAILABLE);
							newStock.setItem(item);
							newStock.setPurchaseDate(bo.getDeliveryDate());
							if(boi.isFreebie() || promoItem.isFreebie()) {
								newStock.setPurchasePrice(0);
							}else {
								float unitPrice = promoItem.getItemPrice()/promoItem.getQuantity();
								newStock.setPurchasePrice(unitPrice -  (unitPrice*Constants.DEALER_RATE));
							}
							stockRepository.save(newStock);
						}
						float stock = item.getStocksLeft() + neededStock;
						item.setStocksLeft(stock);
						itemRepository.save(item);
					});
				}
				updatePromoStock();
			}
		});
	}
	
	public void updatePromoStock() {
		List<Promo> promoList = promoRepository.findAll();
		promoList.forEach(promo -> {
			List<PromoItem> promoItemList = promoItemRepository.findByPromoId(promo.getPromoId());
			
			HashMap<Integer, Float> requiredStockCount = new HashMap<Integer, Float>();
			HashMap<Integer, Float> actualStockCount = new HashMap<Integer, Float>();
			List<Integer> itemIdKeys = new ArrayList<Integer>();
			promoItemList.forEach(promoItem -> {
				float stockCount = 0;
				if(requiredStockCount.containsKey(promoItem.getItem().getItemId())) {
					stockCount = requiredStockCount.get(promoItem.getItem().getItemId()) + promoItem.getQuantity();
				}else {
					stockCount = promoItem.getQuantity();
				}
				requiredStockCount.put(promoItem.getItem().getItemId(), stockCount);
				Item tempItem = itemRepository.findById(promoItem.getItem().getItemId()).get();
				actualStockCount.put(promoItem.getItem().getItemId(), tempItem.getStocksLeft());
				if(!itemIdKeys.contains(tempItem.getItemId())) itemIdKeys.add(tempItem.getItemId());
			});
			
			HashMap<Integer, Integer> sufficientStockMap = new HashMap<Integer, Integer>();
			
			itemIdKeys.forEach(itemId -> {
				int sufficientStock = (int) (actualStockCount.get(itemId) / requiredStockCount.get(itemId));
				sufficientStockMap.put(itemId, sufficientStock);
				
			});
			
			float promoCount = Collections.min(sufficientStockMap.values());
				if(promo.getStocksLeft() != promoCount) {
				promo.setStocksLeft(promoCount);
				promoRepository.save(promo);
			}
		});
	}

}
