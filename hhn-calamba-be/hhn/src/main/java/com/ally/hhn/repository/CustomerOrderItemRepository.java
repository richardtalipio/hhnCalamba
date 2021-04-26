package com.ally.hhn.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.ally.hhn.model.CustomerOrderItem;

@Repository
public interface CustomerOrderItemRepository extends JpaRepository<CustomerOrderItem, Integer>{
	
	@Query("SELECT COI FROM CustomerOrderItem COI WHERE COI.customerOrder.customerOrderId = :customerOrderid ")
	List<CustomerOrderItem> findByCustomerOrderid(@Param("customerOrderid") Integer customerOrderid);

}
