import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';
import { TransactionFormComponent } from '../form/transaction-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  @ViewChild('formTransaction')
  formTransaction: TransactionFormComponent; //buat variabel untuk menghubungkan parent dan child

  listTransaction: Transaction[] = [];
  showDetail: boolean = true;
  selectedTransaction: Transaction = new Transaction();

  constructor(private transactionService: TransactionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params=> {
        let accountNumber = params['accountNumber'];
        this.loadData(accountNumber);
      }
    );
  }

  selectTransaction(transaction: Transaction){
    let copyTransaction = new Transaction(); //let hanya berlaku di satu blok, car adalah variabel global
    copyTransaction.id= transaction.id;
    copyTransaction.type = transaction.type;
    copyTransaction.amount = transaction.amount;
    copyTransaction.amountSign = transaction.amountSign;
    copyTransaction.account = transaction.account;
    this.selectedTransaction = copyTransaction;
    this.showDetail = true;
    this.formTransaction.updateData();
  }

  loadData(accountNumber?){
    this.transactionService.getList(accountNumber).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        Object.assign(this.listTransaction, response);
    },(err)=>{
      alert('error '+JSON.stringify(err));
    }
    );
  }
 
  delete(id){
    // alert(customerNumber);
    this.transactionService.delete(id).subscribe(
      (response)=>{
        // console.log(JSON.stringify(response));
        location.href = '/transaction-list';
    },(err)=>{
      alert('error '+JSON.stringify(err));
    }
    );
  }

  prosesResult(result){
    if(result){
      this.showDetail=false;
      this.loadData();
    }
  }

}
