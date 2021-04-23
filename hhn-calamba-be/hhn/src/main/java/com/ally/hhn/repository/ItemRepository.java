package com.ally.hhn.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ally.hhn.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
	
	@Query("SELECT I FROM Item  I WHERE I.itemName LIKE %:itemName% ")
	Page<Item> findByItemName(@Param("itemName") String itemName, Pageable pageable);
	
	@Query("SELECT I FROM Item  I WHERE I.itemName LIKE %:itemName% ")
	List<Item> findByItemName(@Param("itemName") String itemName);
	
	@Query("SELECT DISTINCT I.category FROM Item I")
	List<String> findAllItemCategory();
	
	@Query("SELECT I FROM Item I where I.stocksLeft != 0")
	List<Item> findAllWithStock();
}
