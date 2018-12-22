import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { Account } from '../account';
import { Customer } from 'src/app/customer/customer';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  customer : Object;

  accForm : FormGroup;

  @Output()
  result = new EventEmitter();

  constructor(private fb: FormBuilder, private data : AccountService, private router : Router) { }
 
  ngOnInit() {
    this.accForm = this.fb.group({
      accountNumber:[''],
      openDate : ['', Validators.required],
      balance: ['', Validators.required],
      customer: ['', Validators.required]
    });
  }

  insertData(){
    let account: Account = new Account();
    account.accountNumber = this.accForm.controls['accountNumber'].value;
    account.openDate = this.accForm.controls['openDate'].value;
    account.balance = this.accForm.controls['balance'].value;

    let customer = new Customer();
    customer.customerNumber = this.accForm.controls['customer'].value;
    account.customer = customer;

    this.data.insert(account).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
        location.href = '/account-list';
    },(err)=>{
      alert('error '+JSON.stringify(err));
    }
    );
  }

  setSelectedCustomer(customer : Customer){
    this.accForm.controls['customer'].setValue(customer.customerNumber);
    alert(customer.customerNumber);

    this.accForm.updateValueAndValidity();
  }

  cancelChanges(){
    this.result.emit(true);
  } 








}
