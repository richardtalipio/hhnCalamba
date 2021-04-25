package com.ally.hhn.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ally.hhn.model.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Integer> {
	
	@Query("SELECT S FROM Stock S WHERE S.item.itemId = :itemId and stockStatus = :status  ")
	List<Stock> findAllByItemId(@Param("itemId") Integer itemName, String status, Pageable pageable);
}
