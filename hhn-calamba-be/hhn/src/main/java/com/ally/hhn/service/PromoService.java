package com.ally.hhn.service;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ally.hhn.model.Item;
import com.ally.hhn.model.Promo;
import com.ally.hhn.model.PromoDTO;
import com.ally.hhn.model.PromoItem;
import com.ally.hhn.repository.PromoItemRepository;
import com.ally.hhn.repository.PromoRepository;

@Service
public class PromoService {

	@Autowired
	PromoRepository promoRepository;
	
	@Autowired
	PromoItemRepository promoItemRepository;
	
	public JSONObject getPromoTableData(Integer pageNumber, String sortColumn, String order, Integer pageSize, String filter) {
		Sort sort;
		if (order.equalsIgnoreCase("ASC")) {
			sort = Sort.by(sortColumn).ascending();
		} else {
			sort = Sort.by(sortColumn).descending();
		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		List<Promo> itemList = promoRepository.findByPromoName(filter, pageable).getContent();
		int promoCount;
		if(filter.isEmpty()) {
			promoCount = promoRepository.findAll().size();
		}else {
			promoCount = promoRepository.findByPromoName(filter).size();
		}
		JSONObject json = new JSONObject();
		json.put("promoList", itemList);
		json.put("promoCount", promoCount);
		return json;
	}
	
	public void save(PromoDTO promoDTO) {
		final Promo savedPromo = promoRepository.save(promoDTO.getPromoObj());
		
		promoDTO.getPromoItemList().forEach(promoItem -> {
			promoItem.setPromo(savedPromo);
			promoItemRepository.save(promoItem);
		});
	}
	
	public void delete(Promo promo) {
		for(PromoItem promoItem: promoItemRepository.findByPromoId(promo.getPromoId())){
			if(promoItem != null) promoItemRepository.delete(promoItem);
		}

		promoRepository.delete(promo);
	}
	
	public void save(Promo promo) {
		promo.setActive(!promo.isActive());
		promoRepository.save(promo);
	}
	
	public List<PromoDTO> getAllPromos(){
		List<PromoDTO> promoDtoList = new ArrayList<PromoDTO>();
		for(Promo promo: promoRepository.findAllActive()) {
			List<PromoItem> promoItems = promoItemRepository.findByPromoId(promo.getPromoId());
			PromoDTO promoDto = new PromoDTO(promo, promoItems);
			promoDtoList.add(promoDto);		
		}
		return promoDtoList;
	}
}
