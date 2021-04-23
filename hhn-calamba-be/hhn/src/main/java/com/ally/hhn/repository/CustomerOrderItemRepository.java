package com.ally.hhn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ally.hhn.model.CustomerOrderItem;

@Repository
public interface CustomerOrderItemRepository extends JpaRepository<CustomerOrderItem, Integer>{

}
