import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemData } from 'src/app/model/item-data';
import { ItemService } from 'src/app/services/item-service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-item-details-popup',
  templateUrl: './item-details-popup.component.html',
  styleUrls: ['./item-details-popup.component.css']
})
export class ItemDetailsPopupComponent implements OnInit {

  itemForm: FormGroup;
  itemCategories: Observable<string[]>;
  options;
  constructor(
    public dialogRef: MatDialogRef<ItemDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemData,
    private fb: FormBuilder,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    this.loadItemCategories();

  }

  loadItemCategories() {
    this.itemService.getItemCategories().subscribe(result => {
      this.options = result.itemCategories;
      this.itemCategories = this.itemForm.get('category').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    });
    this.initializeForm();
  }

  initializeForm() {
    let pricePattern = "\^([\\d]{0,4})(\\.|$)([\\d]{2,2}|)$";
    this.itemForm = this.fb.group({
      itemId: this.data.itemId,
      itemName: [this.data.itemName, Validators.required],
      variant: [this.data.variant],
      size: [this.data.size],
      category: [this.data.category, Validators.required],
      srp: [this.data.srp, [Validators.pattern(pricePattern), Validators.required]]
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.options == undefined) {
      return [];
    } else {
      return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
  }
}
