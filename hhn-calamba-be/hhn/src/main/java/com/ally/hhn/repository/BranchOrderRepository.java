package com.ally.hhn.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ally.hhn.model.BranchOrder;

@Repository
public interface BranchOrderRepository extends JpaRepository<BranchOrder, Integer> {
	
	@Query("SELECT BO FROM BranchOrder BO WHERE BO.status != 'CLOSED'")
	Page<BranchOrder> findAllOpen(Pageable pageable);
	
	@Query("SELECT BO FROM BranchOrder BO WHERE BO.status != 'CLOSED'")
	List<BranchOrder> findAllOpen();

}
