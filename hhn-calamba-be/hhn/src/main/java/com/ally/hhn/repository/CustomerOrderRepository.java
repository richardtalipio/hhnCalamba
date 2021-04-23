package com.ally.hhn.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ally.hhn.model.CustomerOrder;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Integer> {
	
	@Query("SELECT CO FROM CustomerOrder CO WHERE CO.customer.customerId = :customerId ")
	List<CustomerOrder> findByCustomerId(@Param("customerId") Integer customerId);
	
	@Query("SELECT CO FROM CustomerOrder CO WHERE CO.customer.customerId = :customerId ")
	Page<CustomerOrder> findByCustomerId(@Param("customerId") Integer customerId, Pageable pageable);

}
