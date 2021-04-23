import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerData } from 'src/app/model/customer-data';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {

  customerForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<CustomerNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerData,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.customerForm = this.fb.group({
      customerId: this.data.customerId,
      name: [this.data.name, [Validators.required]],
      mobileNumber: [this.data.mobileNumber, [Validators.required, Validators.pattern('[- +()0-9]{11,}')]],
      status: this.data.status
    })
   }

}
