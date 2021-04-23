import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-confirm',
  templateUrl: './item-confirm.component.html',
  styleUrls: ['./item-confirm.component.css']
})
export class ItemConfirmComponent implements OnInit {

  branchOrderForm: FormGroup;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ItemConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  todayDate = new Date;
  initializeForm() {
    let pricePattern = "\^([\\d]{0,4})(\\.|$)([\\d]{2,2}|)$";
    this.branchOrderForm = this.fb.group({
      branchOrderId: "",
      orderDate: new Date,
      deliveryDate: [new Date, [Validators.required]],
      grandTotal: this.data,
      deliveryMethod: ["", [Validators.required]],
      paymentMethod: ["", [Validators.required]],
      deliveryCharge: [0, [Validators.pattern(pricePattern), Validators.min(0)]],
      delivered: false,
      paid: false
    });
  }

  onFeeChange(){
    let value = this.branchOrderForm.get("deliveryCharge").value;
    this.branchOrderForm.get("grandTotal").patchValue(
      (parseFloat(this.data)+parseFloat(value == undefined || value == "" ? 0:value)).toFixed(2));
  }

}
