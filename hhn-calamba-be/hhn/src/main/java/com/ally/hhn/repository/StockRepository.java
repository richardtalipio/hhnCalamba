package com.ally.hhn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ally.hhn.model.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Integer> {

}
