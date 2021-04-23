package com.ally.hhn.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ally.hhn.model.Promo;

@Repository
public interface PromoRepository  extends JpaRepository<Promo, Integer> {
	
	@Query("SELECT P FROM Promo  P WHERE P.promoName LIKE %:promoName% ")
	Page<Promo> findByPromoName(@Param("promoName") String promoName, Pageable pageable);
	
	@Query("SELECT P FROM Promo  P WHERE P.promoName LIKE %:promoName% ")
	List<Promo> findByPromoName(@Param("promoName") String promoName);
	
	@Query("SELECT P FROM Promo  P WHERE P.isActive = true")
	List<Promo> findAllActive();
}
