package com.ally.hhn.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.sql.Date;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ally.hhn.model.BranchOrder;
import com.ally.hhn.model.BranchOrderItem;
import com.ally.hhn.model.Customer;
import com.ally.hhn.model.CustomerOrder;
import com.ally.hhn.model.CustomerOrderDTO;
import com.ally.hhn.model.CustomerOrderItem;
import com.ally.hhn.model.Item;
import com.ally.hhn.model.Promo;
import com.ally.hhn.model.PromoItem;
import com.ally.hhn.model.Stock;
import com.ally.hhn.repository.CustomerOrderItemRepository;
import com.ally.hhn.repository.CustomerOrderRepository;
import com.ally.hhn.repository.CustomerRepository;
import com.ally.hhn.repository.ItemRepository;
import com.ally.hhn.repository.PromoItemRepository;
import com.ally.hhn.repository.PromoRepository;
import com.ally.hhn.repository.StockRepository;
import com.ally.hhn.utils.Constants;

@Service
public class CustomerService {
	
	@Autowired
	CustomerRepository customerRepository;
	
	@Autowired
	CustomerOrderRepository customerOrderRepository;
	
	@Autowired
	CustomerOrderItemRepository customerOrderItemRepository;
	
	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	StockRepository stockRepository;

	@Autowired
	PromoItemRepository promoItemRepository;
	
	@Autowired
	PromoRepository promoRepository;
	
	public JSONObject getCustomerTableData(Integer pageNumber, String sortColumn, String order, Integer pageSize,
			String filter) {

		Sort sort;
		if (order.equalsIgnoreCase("ASC")) {
			sort = Sort.by(sortColumn).ascending();
		} else {
			sort = Sort.by(sortColumn).descending();
		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		List<Customer> customerList = customerRepository.findByCustomerName(filter, pageable).getContent();
		int customerCount;
		if (filter.isEmpty()) {
			customerCount = customerRepository.findAll().size();
		} else {
			customerCount = customerRepository.findByCustomerName(filter).size();
		}
		JSONObject json = new JSONObject();
		json.put("customerList", customerList);
		json.put("customerCount", customerCount);
		return json;
	}
	
	public void save(Customer customer) {
		if(customer.getStatus() == null || customer.getStatus().isEmpty()) {
			customer.setStatus("New Customer");
		}
		customerRepository.save(customer);
	}
	
	public void delete(Customer customer) {
		
		customerRepository.delete(customer);
	}
	
	public JSONObject getCustomerOrderTableData(Integer pageNumber, String sortColumn, String order, Integer pageSize,
			String filter) {
		
		Sort sort;
		if (order.equalsIgnoreCase("ASC")) {
			sort = Sort.by(sortColumn).ascending();
		} else {
			sort = Sort.by(sortColumn).descending();
		}
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		List<CustomerOrder> customerOrderList ;
		int customerOrderCount ;
		if(filter == "" || filter == null) {
			customerOrderList = customerOrderRepository.findAll(pageable).getContent();
			customerOrderCount = customerOrderRepository.findAll().size();
		}else {
			customerOrderList = customerOrderRepository.findByCustomerId(Integer.parseInt(filter), pageable).getContent();
			customerOrderCount = customerOrderRepository.findByCustomerId(Integer.parseInt(filter)).size();
		}
		
		
		
		JSONObject json = new JSONObject();
		json.put("customerOrderList", customerOrderList);
		json.put("customerOrderCount", customerOrderCount);
		return json;
	}
	
	public void save(CustomerOrderDTO customerDTO) {
		Customer customer = customerDTO.getCustomer();
		customer = customerRepository.save(customer);
		CustomerOrder customerOrder = customerDTO.getCustomerOrder();
		customerOrder.setCustomer(customer);
		final CustomerOrder savedCustomerOrder = getStatus(customerOrder, customerDTO.getCustomerOrderItem());
		
		customerDTO.getCustomerOrderItem().forEach(customerOrderItem -> {
			customerOrderItem.setCustomerOrder(savedCustomerOrder);
			customerOrderItemRepository.save(customerOrderItem);
		});
	}
	
	private CustomerOrder getStatus(CustomerOrder co, List<CustomerOrderItem> customerOrderItemList) {
		float profitEarned = 0;
		if(co.isPaid() && co.isDelivered()) {
			co.setStatus(Constants.CLOSED);
		}else if (co.isPaid() && !co.isDelivered()) {
			co.setStatus(Constants.DELIVERY);
		}else if (!co.isPaid() && co.isDelivered()) {
			co.setStatus(Constants.PAYMENT);
		}else {
			co.setStatus(Constants.NEW_ORDER);
			profitEarned = removeStock(co, customerOrderItemList);
			co.setProfitEarned(profitEarned);
		}
		return co;
	}
	
	
	private float removeStock(CustomerOrder co, List<CustomerOrderItem> customerOrderItemList) {
		float profitEarned = 0;
		for(CustomerOrderItem coi: customerOrderItemList){
			if (coi.getProductCode() != null) {
				
				if (coi.getProductType().equalsIgnoreCase(Constants.ITEMS)) {
					Item item = itemRepository.findById(coi.getProductCode()).get();
					List<Stock> availableStock = stockRepository.findAllByItemId(item.getItemId(), 
							Constants.AVAILABLE, PageRequest.of(0,(int)coi.getQuantity()));
					for(Stock boughtStock: availableStock){
						boughtStock.setStockStatus(Constants.SOLD);
						boughtStock.setSellingDate(co.getDeliveryDate());
						float sellingPrice;
						if(coi.isFreebie()) {
							sellingPrice = 0;
						}else {
							sellingPrice = coi.getSellingPrice()/coi.getQuantity();
						}
						profitEarned = profitEarned + (sellingPrice - boughtStock.getPurchasePrice());
						boughtStock.setSellingPrice(sellingPrice);
						stockRepository.save(boughtStock);
					};
					
					float stock = item.getStocksLeft() - coi.getQuantity();
					item.setStocksLeft(stock);
					itemRepository.save(item);
					
				} else {
					Promo promo = promoRepository.findById(coi.getProductCode()).get();
					List<PromoItem> promoItemList = promoItemRepository.findByPromoId(promo.getPromoId());
					for(PromoItem promoItem: promoItemList){
						Item item = itemRepository.findById(promoItem.getItem().getItemId()).get();
						List<Stock> availableStock = stockRepository.findAllByItemId(item.getItemId(), 
								Constants.AVAILABLE, PageRequest.of(0, (int)(coi.getQuantity()*promoItem.getQuantity()) ));
						for(Stock boughtStock: availableStock){
							boughtStock.setStockStatus(Constants.SOLD);
							boughtStock.setSellingDate(co.getDeliveryDate());
							float unitPrice = promoItem.getItemPrice()/promoItem.getQuantity();
							float sellingPrice = unitPrice - (unitPrice*coi.getItemDiscount()/100);
							if(coi.isFreebie() || promoItem.isFreebie()) {
								sellingPrice = 0;
							}else {
								sellingPrice = unitPrice - (unitPrice*coi.getItemDiscount()/100);
							}
							boughtStock.setSellingPrice(sellingPrice);
							System.out.println((profitEarned+ " " + sellingPrice + " " + boughtStock.getPurchasePrice()));
							profitEarned = profitEarned + ( sellingPrice - boughtStock.getPurchasePrice() );
							stockRepository.save(boughtStock);
						};
						float stock = item.getStocksLeft() - (coi.getQuantity() * promoItem.getQuantity());
						item.setStocksLeft(stock);
						itemRepository.save(item);
					};
				}
				updatePromoStock();
			}
		};
		return profitEarned;
	}

	public void updatePromoStock() {
		List<Promo> promoList = promoRepository.findAll();
		promoList.forEach(promo -> {
			List<PromoItem> promoItemList = promoItemRepository.findByPromoId(promo.getPromoId());
			
			HashMap<Integer, Float> requiredStockCount = new HashMap<Integer, Float>();
			HashMap<Integer, Float> actualStockCount = new HashMap<Integer, Float>();
			List<Integer> itemIdKeys = new ArrayList<Integer>();
			promoItemList.forEach(promoItem -> {
				float stockCount = 0;
				if(requiredStockCount.containsKey(promoItem.getItem().getItemId())) {
					stockCount = requiredStockCount.get(promoItem.getItem().getItemId()) + promoItem.getQuantity();
				}else {
					stockCount = promoItem.getQuantity();
				}
				requiredStockCount.put(promoItem.getItem().getItemId(), stockCount);
				Item tempItem = itemRepository.findById(promoItem.getItem().getItemId()).get();
				actualStockCount.put(promoItem.getItem().getItemId(), tempItem.getStocksLeft());
				if(!itemIdKeys.contains(tempItem.getItemId())) itemIdKeys.add(tempItem.getItemId());
			});
			
			HashMap<Integer, Integer> sufficientStockMap = new HashMap<Integer, Integer>();
			
			itemIdKeys.forEach(itemId -> {
				int sufficientStock = (int) (actualStockCount.get(itemId) / requiredStockCount.get(itemId));
				sufficientStockMap.put(itemId, sufficientStock);
				
			});
			
			float promoCount = Collections.min(sufficientStockMap.values());
				if(promo.getStocksLeft() != promoCount) {
				promo.setStocksLeft(promoCount);
				promoRepository.save(promo);
			}
		});
	}
}
