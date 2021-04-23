package com.ally.hhn.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ally.hhn.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>  {

	@Query("SELECT C FROM Customer  C WHERE C.name LIKE %:name% ")
	Page<Customer> findByCustomerName(@Param("name") String name, Pageable pageable);
	
	@Query("SELECT C FROM Customer  C WHERE C.name LIKE %:name% ")
	List<Customer> findByCustomerName(@Param("name") String name);
}
