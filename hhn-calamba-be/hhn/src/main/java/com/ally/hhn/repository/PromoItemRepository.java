package com.ally.hhn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ally.hhn.model.PromoItem;

@Repository
public interface PromoItemRepository  extends JpaRepository<PromoItem, Integer> {
	
	@Query("SELECT PI FROM PromoItem PI WHERE PI.promo.promoId = :promoId ")
	List<PromoItem> findByPromoId(@Param("promoId") Integer promoId);
}
