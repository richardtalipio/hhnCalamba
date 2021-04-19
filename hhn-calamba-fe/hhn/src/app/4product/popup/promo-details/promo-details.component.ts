import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { ItemData } from 'src/app/model/item-data';
import { ItemService } from 'src/app/services/item-service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { COMMA, ENTER, R } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { PromoItemData } from 'src/app/model/promo-item-data';
import { PromoData } from 'src/app/model/promo-data';
import { viewClassName } from '@angular/compiler';
import { PromoService } from 'src/app/services/promo-service';

@Component({
  selector: 'app-promo-details',
  templateUrl: './promo-details.component.html',
  styleUrls: ['./promo-details.component.css']
})
export class PromoDetailsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems: Observable<ItemData[]>;
  items: ItemData[] = [];
  allItems: ItemData[] = [];
  promo = new PromoData;



  promoItemLists = new FormArray([]);

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit(): void {

  }

  constructor(private itemService: ItemService, private fb: FormBuilder,
    private promoService: PromoService,) {
    itemService.getAllItems().subscribe(items => {
      this.allItems = items;
      this.filteredItems = this.itemCtrl.valueChanges.pipe(
        startWith(null),
        map((item: string | null) => item ? this._filter(item) : this.allItems.slice()));
    })
  }

  private _filter(value: string): ItemData[] {
    const filterValue = value.toString().toLowerCase();

    return this.allItems.filter(item => item.itemName.toLowerCase().indexOf(filterValue) === 0);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      let tempItem = this._filter(value);
      if (tempItem.length != 0) {
        this.items.push(tempItem[0]);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.itemCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.items.findIndex(itemEl => itemEl.itemName === item);
    if (index >= 0) {
      this.items.splice(index, 1);
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

  createPromoItem() {
    this.promoItemLists.clear();
    let pricePattern = "\^([\\d]{0,4})(\\.|$)([\\d]{2,2}|)$";
    this.items.forEach(item => {
      const promoItem = this.fb.group({
        promoItemId: "",
        promoItemName: item.itemName + " " + item.size + (item.variant ? " (" + item.variant + ")" : ""),
        oldPrice: item.srp,
        itemPrice: [0, [Validators.pattern(pricePattern), Validators.required, Validators.min(0)]],
        quantity: [1, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.min(1)]],
        item: [item],
      });
      this.promoItemLists.push(promoItem);
    });

    console.log(this.promoItemLists.length)
  }

  onQuantityChange(index: any) {

    const promoItem = this.promoItemLists.at(index).value;
    const totalOldPrice = promoItem.quantity * promoItem.item.srp;
    this.promoItemLists.at(index).get("oldPrice").patchValue(totalOldPrice);
  }

  createPromo() {
    
    let origPrice = 0;
    let discountedPrice: number = 0;
    let discountAmount: number = 0;
    let freeItems = "";
    let promoItems = "";

    this.promoItemLists.value.forEach(element => {
      if (element.itemPrice === 0) {
        if (freeItems  === "") {
          freeItems = element.quantity + " " + element.promoItemName;
        }else{
          freeItems = freeItems + " and " + element.quantity + " " + element.promoItemName;
        }
      } else {
        origPrice = origPrice + parseFloat(element.oldPrice);
        discountedPrice = discountedPrice + parseFloat(element.itemPrice);
        if (promoItems === "") {
          promoItems = element.quantity + " " + element.promoItemName;
        } else {
          promoItems = promoItems + " + " + element.quantity + " " + element.promoItemName;
        }
      }
    });
    
    if (freeItems !== ""){
      this.promo.promoName = "Get "+freeItems+ " for free when you buy "+promoItems;
    }else{
      discountAmount = origPrice - discountedPrice;
      this.promo.promoName = "Get P" + discountAmount + " off when you buy " + promoItems;
    }

    this.promo.promoPrice = parseFloat(discountedPrice.toString());
    this.promo.active = true;
  }
}
