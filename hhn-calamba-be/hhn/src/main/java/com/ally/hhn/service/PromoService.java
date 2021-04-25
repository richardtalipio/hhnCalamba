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
import com.ally.hhn.model.Item;
import com.ally.hhn.model.Promo;
import com.ally.hhn.model.PromoDTO;
import com.ally.hhn.model.PromoItem;
import com.ally.hhn.repository.ItemRepository;
import com.ally.hhn.repository.PromoItemRepository;
import com.ally.hhn.repository.PromoRepository;
import com.ally.hhn.utils.Constants;

@Service
public class PromoService {

	@Autowired
	PromoRepository promoRepository;

	@Autowired
	PromoItemRepository promoItemRepository;

	@Autowired
	ItemRepository itemRepository;

	public JSONObject getPromoTableData(Integer pageNumber, String sortColumn, String order, Integer pageSize,
			String filter) {

		if (sortColumn.equalsIgnoreCase(Constants.ACTIVE)) {
			sortColumn = "isActive";
		}

		Sort sort;
		if (order.equalsIgnoreCase("ASC")) {
			sort = Sort.by(sortColumn).ascending();
		} else {
			sort = Sort.by(sortColumn).descending();
		}

		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		List<Promo> itemList = promoRepository.findByPromoName(filter, pageable).getContent();
		int promoCount;
		if (filter.isEmpty()) {
			promoCount = promoRepository.findAll().size();
		} else {
			promoCount = promoRepository.findByPromoName(filter).size();
		}
		JSONObject json = new JSONObject();
		json.put("promoList", itemList);
		json.put("promoCount", promoCount);
		return json;
	}

	public void save(PromoDTO promoDTO) {
		final Promo savedPromo = promoRepository.save(promoDTO.getPromoObj());

		HashMap<Integer, Float> requiredStockCount = new HashMap<Integer, Float>();
		HashMap<Integer, Float> actualStockCount = new HashMap<Integer, Float>();
		List<Integer> itemIdKeys = new ArrayList<Integer>();

		promoDTO.getPromoItemList().forEach(promoItem -> {
			float stockCount = 0;
			if (requiredStockCount.containsKey(promoItem.getItem().getItemId())) {
				stockCount = requiredStockCount.get(promoItem.getItem().getItemId()) + promoItem.getQuantity();
			} else {
				stockCount = promoItem.getQuantity();
			}
			requiredStockCount.put(promoItem.getItem().getItemId(), stockCount);
			Item tempItem = itemRepository.findById(promoItem.getItem().getItemId()).get();
			actualStockCount.put(promoItem.getItem().getItemId(), tempItem.getStocksLeft());
			if (!itemIdKeys.contains(tempItem.getItemId()))
				itemIdKeys.add(tempItem.getItemId());

			promoItem.setPromo(savedPromo);
			promoItemRepository.save(promoItem);
		});

		HashMap<Integer, Integer> sufficientStockMap = new HashMap<Integer, Integer>();

		itemIdKeys.forEach(itemId -> {
			int sufficientStock = (int) (actualStockCount.get(itemId) / requiredStockCount.get(itemId));
			sufficientStockMap.put(itemId, sufficientStock);

		});

		float promoCount = Collections.min(sufficientStockMap.values());
		if (savedPromo.getStocksLeft() != promoCount) {
			savedPromo.setStocksLeft(promoCount);
			promoRepository.save(savedPromo);
		}
	}

	public void delete(Promo promo) {
		for (PromoItem promoItem : promoItemRepository.findByPromoId(promo.getPromoId())) {
			if (promoItem != null)
				promoItemRepository.delete(promoItem);
		}

		promoRepository.delete(promo);
	}

	public void save(Promo promo) {
		promo.setActive(!promo.isActive());
		promoRepository.save(promo);
	}

	public List<PromoDTO> getAllPromos(boolean withStock) {
		List<PromoDTO> promoDtoList = new ArrayList<PromoDTO>();
		List<Promo> existingPromo;
		if (withStock) {
			existingPromo = promoRepository.findAllWithStock();
		} else {
			existingPromo = promoRepository.findAllActive();
		}
		for (Promo promo : existingPromo) {
			List<PromoItem> promoItems = promoItemRepository.findByPromoId(promo.getPromoId());
			PromoDTO promoDto = new PromoDTO(promo, promoItems);
			promoDtoList.add(promoDto);
		}
		return promoDtoList;
	}

	public JSONObject getPromoItemList(Promo promo) {
		List<PromoItem> promoItemList = promoItemRepository.findByPromoId(promo.getPromoId());
		JSONObject json = new JSONObject();
		json.put("promoItemList", promoItemList);
		return json;
	}

}
