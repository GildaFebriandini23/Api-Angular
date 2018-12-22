import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient:HttpClient) { }

  getList(accountNumber?){
    let params: string = "";
    if(accountNumber){
      params = "?account="+accountNumber;
    }
    return this.httpClient.get('http://localhost:8081/transaction/list' + params);
  }

  update(transaction: Transaction){
    return this.httpClient.put('http://localhost:8081/transaction/trxput', transaction);
  }

  insert(transaction: Transaction){
    return this.httpClient.post('http://localhost:8081/transaction/trxpost', transaction);
  }

  delete(transaction){
    return this.httpClient.delete('http://localhost:8081/transaction/trxdelete/'+ transaction);
  }
} 
 