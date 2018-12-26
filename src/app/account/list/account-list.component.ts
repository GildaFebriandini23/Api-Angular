import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { AccountFormComponent } from '../form/account-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  @ViewChild('formAccount')
  formAccount: AccountFormComponent; //buat variabel untuk menghubungkan parent dan child


  listAccount: Account[] = [];
  showDetail: boolean = false;
  selectedAccount: Account = new Account();

  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      params=> {
        let customernumber = params['customernumber'];
        this.loadData(customernumber);
      }
    );
  }

  selectAccount(account: Account){
    let copyAccount = new Account(); //let hanya berlaku di satu blok, car adalah variabel global
    copyAccount.accountNumber = account.accountNumber;
    copyAccount.openDate = account.openDate;
    copyAccount.balance = account.balance;
    copyAccount.customer = account.customer;
    this.selectedAccount = copyAccount;
    this.showDetail = true;
    this.formAccount.updateData();
  }

  
  loadData(customernumber?){
    this.accountService.getList(customernumber).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        Object.assign(this.listAccount, response);
    },(err)=>{
      alert('error '+JSON.stringify(err));
    }
    );
  }

  delete(accountnumber){
    // alert(customerNumber);
    this.accountService.delete(accountnumber).subscribe(
      (response)=>{
        // console.log(JSON.stringify(response));
        location.href = '/account-list';
    },(err)=>{
      alert('error '+JSON.stringify(err));
    }
    );
  }

  view_transaction(account: Account){
    this.router.navigate(['/transaction-list',{accountNumber:account.accountNumber }]);
  }

  prosesResult(result){
    if(result){
      this.showDetail=false;
      this.loadData();
    }
  }
 
}
