import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/account/account';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  @Input()
  transaction: Transaction;

  @Output()
  result = new EventEmitter();

  transactionFormGroup: FormGroup;

  constructor(private transactionService: TransactionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.transactionFormGroup = this.formBuilder.group({
      id:[''],
      type: ['', Validators.required],
      amount: ['', Validators.required],
      amountSign: ['', Validators.required],
      account: ['', Validators.required]
    });
    this.updateData();
  }

  submitData(){
    let transaction: Transaction = new Transaction();
    transaction.id = this.transactionFormGroup.controls['id'].value;
    transaction.type = this.transactionFormGroup.controls['type'].value;
    transaction.amount = this.transactionFormGroup.controls['amount'].value;
    transaction.amountSign = this.transactionFormGroup.controls['amountSign'].value;

    let account = new Account();
    account.accountNumber = this.transactionFormGroup.controls['account'].value;
    transaction.account = account;

    this.transactionService.update(transaction).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
        location.href = '/transaction-list';
    },(err)=>{
      alert('error '+JSON.stringify(err));
    }
    );
  }

  updateData(){
    this.setDataToForm(this.transaction);
  }

  setDataToForm(transaction){
    if(transaction){
      this.transactionFormGroup.controls['id'].setValue(this.transaction.id);
      this.transactionFormGroup.controls['type'].setValue(this.transaction.type);
      this.transactionFormGroup.controls['amount'].setValue(this.transaction.amount);
      this.transactionFormGroup.controls['amountSign'].setValue(this.transaction.amountSign);
      this.transactionFormGroup.controls['account'].setValue(this.transaction.account.accountNumber);
     
    }
  }

  insertData(){
    let transaction: Transaction = new Transaction();
    transaction.id = this.transactionFormGroup.controls['id'].value;
    transaction.type = this.transactionFormGroup.controls['type'].value;
    transaction.amount = this.transactionFormGroup.controls['amount'].value;
    transaction.amountSign = this.transactionFormGroup.controls['amountSign'].value;

    let account = new Account();
    account.accountNumber = this.transactionFormGroup.controls['account'].value;
    transaction.account = account;

    this.transactionService.insert(transaction).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
        location.href = '/transaction-list';
    },(err)=>{
      alert('error '+JSON.stringify(err));
    }
    );
  }

  cancelChanges(){
    this.result.emit(true);
  }
 
}
 