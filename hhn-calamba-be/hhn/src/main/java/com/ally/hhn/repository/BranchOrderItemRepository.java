package com.ally.hhn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ally.hhn.model.BranchOrderItem;
import com.ally.hhn.model.PromoItem;

@Repository
public interface BranchOrderItemRepository extends JpaRepository<BranchOrderItem, Integer>{
	
	@Query("SELECT BOI FROM BranchOrderItem BOI WHERE BOI.branchOrder.branchOrderId = :branchOrderId ")
	List<BranchOrderItem> findByBranchOrderId(@Param("branchOrderId") Integer branchOrderId);
}
