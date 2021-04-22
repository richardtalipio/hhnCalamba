package com.ally.hhn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ally.hhn.model.BranchOrderItem;

@Repository
public interface BranchOrderItemRepository extends JpaRepository<BranchOrderItem, Integer>{

}
