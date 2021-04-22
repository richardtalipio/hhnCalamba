import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BranchOrderData } from 'src/app/model/branch-order-data';
import { ItemData } from 'src/app/model/item-data';
import { COMMA, ENTER, R } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/services/item-service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductService } from 'src/app/services/product-service';
import { PromoData } from 'src/app/model/promo-data';
import { BranchOrderItemData } from 'src/app/model/branch-order-item-data';

@Component({
  selector: 'app-branch-order-details',
  templateUrl: './branch-order-details.component.html',
  styleUrls: ['./branch-order-details.component.css']
})
export class BranchOrderDetailsComponent implements OnInit {

  branchOrderForm: FormGroup;
  branchOrder = new BranchOrderData;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  items: ItemData[] = [];
  itemCtrl = new FormControl();
  filteredItems: Observable<ItemData[]>;
  allItems: ItemData[] = [];
  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto1') matAutocomplete1: MatAutocomplete;

  promos: PromoData[] = [];
  promoCtrl = new FormControl();
  filteredPromos: Observable<PromoData[]>;
  allPromos: PromoData[] = [];
  @ViewChild('auto2') matAutocomplete2: MatAutocomplete;
  @ViewChild('promoInput') promoInput: ElementRef<HTMLInputElement>;

  branchOrderItemList = new FormArray([]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: BranchOrderData,
    private fb: FormBuilder,
    private productService: ProductService) {
    productService.getAllProducts().subscribe(products => {
      this.allItems = products.items;
      this.filteredItems = this.itemCtrl.valueChanges.pipe(
        startWith(null),
        map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));
      this.allPromos = products.promos;
      this.filteredPromos = this.promoCtrl.valueChanges.pipe(
        startWith(null),
        map((promo: string | null) => promo ? this._filter2(promo) : this.allPromos.slice()));
    })
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    let pricePattern = "\^([\\d]{0,4})(\\.|$)([\\d]{2,2}|)$";
    this.branchOrderForm = this.fb.group({
      branchOrderId: this.data.branchOrderId,
      orderDate: [this.data.orderDate],
      deliveryDate: [this.data.deliveryDate, Validators.required],
      deliveryMethod: [this.data.deliveryMethod, Validators.required],
      paymentMethod: [this.data.paymentMethod, Validators.required],
      deliveryCharge: [this.data.deliveryCharge, [Validators.required, Validators.pattern(pricePattern)]],

      grandTotal: [this.data.grandTotal],
      status: [this.data.status],
      isDelivered: [this.data.delivered],
      isPaid: [this.data.paid],
    });
  }

  private _filter(value: string): ItemData[] {
    const filterValue = value.toString().toLowerCase();

    return this.allItems.filter(item => item.itemName.toLowerCase().indexOf(filterValue) >= 0);
  }

  private _filter2(value: string): PromoData[] {
    const filterValue = value.toString().toLowerCase();

    return this.allPromos.filter(promo => promo.promoName.toLowerCase().indexOf(filterValue) >= 0);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      let tempItem = this._filter(value);
      if (tempItem.length != 0) {
        this.items.push(tempItem[0]);
      }
    }
    if (input) {
      input.value = '';
    }
    this.itemCtrl.setValue(null);
  }

  add2(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      let tempPromo = this._filter2(value);
      if (tempPromo.length != 0) {
        this.promos.push(tempPromo[0]);
      }
    }
    if (input) {
      input.value = '';
    }
    this.promoCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.items.findIndex(itemEl => itemEl.itemName === item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  remove2(promo: string): void {
    const index = this.promos.findIndex(promoEl => promoEl.promoName === promo);
    if (index >= 0) {
      this.promos.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const index = this.items.findIndex(itemEl => itemEl.itemId === event.option.value.itemId);
    let itemName: string = event.option.value.itemName;
    if (index < 0) {
      this.items.push(this._filter(itemName)[0]);
    }
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  selected2(event: MatAutocompleteSelectedEvent): void {
    const index = this.promos.findIndex(promoEl => promoEl.promoId === event.option.value.promoId);
    let promoName: string = event.option.value.promoName;
    if (index < 0) {
      this.promos.push(this._filter2(promoName)[0]);
    }
    this.promoInput.nativeElement.value = '';
    this.promoCtrl.setValue(null);
  }

  createInvoice() {
    this.branchOrderItemList.clear();

    this.items.forEach(item => {
      const branchOrderItem = this.fb.group({
        branchOrderItemId: "",
        dealersPrice: item.srp - (item.srp * 0.30),
        quantity: [1, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.min(1)]],
        productType: "item",
        productCode: item.itemId,
        productName: item.itemName,
        product: item
      });

      this.branchOrderItemList.push(branchOrderItem);
    })

    this.promos.forEach(promo => {
      let tempProductName: string = promo.includedItems;
      if(tempProductName.lastIndexOf("|") >= 0){
        tempProductName = promo.includedItems.replaceAll('|', '\n');
      }
      const branchOrderItem = this.fb.group({
        branchOrderItemId: "",
        dealersPrice: promo.promoPrice - (promo.promoPrice * 0.30),
        quantity: [1, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.min(1)]],
        productType: "promo",
        productCode: promo.promoId,
        productName: tempProductName,
        product: promo

      });

      this.branchOrderItemList.push(branchOrderItem);
    })
  }

  onQuantityChange(index: any) {

    const branchOrderItem = this.branchOrderItemList.at(index).value;
    if (branchOrderItem.productType == "item") {
      const dealersPrice = branchOrderItem.quantity * (branchOrderItem.product.srp - (branchOrderItem.product.srp * 0.30));
      this.branchOrderItemList.at(index).get("dealersPrice").patchValue(dealersPrice);
    }else{
      const dealersPrice = branchOrderItem.quantity * (branchOrderItem.product.promoPrice - (branchOrderItem.product.promoPrice * 0.30));
      this.branchOrderItemList.at(index).get("dealersPrice").patchValue(dealersPrice);
    }
  }

  createReceipt(){
    let grandTotal = 0;
    this.branchOrderItemList.value.forEach(element => {
        grandTotal = grandTotal + element.dealersPrice;
    });
    this.branchOrder = this.branchOrderForm.value;
    grandTotal = grandTotal + parseFloat(this.branchOrder.deliveryCharge);
    this.branchOrder.grandTotal = parseFloat(grandTotal.toString()).toFixed(2);
    this.branchOrder.orderDate = new Date;
    this.branchOrder.paid = false;
    this.branchOrder.delivered = false;
    this.branchOrder.status = "New Order";

  }

}
