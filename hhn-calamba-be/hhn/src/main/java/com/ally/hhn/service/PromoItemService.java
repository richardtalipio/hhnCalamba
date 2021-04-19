package com.ally.hhn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ally.hhn.model.PromoItem;
import com.ally.hhn.repository.PromoItemRepository;

@Service
public class PromoItemService {
	
	@Autowired
	PromoItemRepository promoItemRepository;
	
	public void save(PromoItem promoItem) {
		promoItemRepository.save(promoItem);
	}
}
