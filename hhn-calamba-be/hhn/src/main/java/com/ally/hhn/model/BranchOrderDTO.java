package com.ally.hhn.model;

import java.util.List;

public class BranchOrderDTO {
	
	private BranchOrder branchOrder;
	private List<BranchOrderItem> branchOrderItemList;
	public BranchOrder getBranchOrder() {
		return branchOrder;
	}
	public void setBranchOrder(BranchOrder branchOrder) {
		this.branchOrder = branchOrder;
	}
	public List<BranchOrderItem> getBranchOrderItemList() {
		return branchOrderItemList;
	}
	public void setBranchOrderItemList(List<BranchOrderItem> branchOrderItemList) {
		this.branchOrderItemList = branchOrderItemList;
	}
	
	
}
