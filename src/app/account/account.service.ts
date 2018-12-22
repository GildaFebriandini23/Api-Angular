import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient:HttpClient) { }

  getList(customerNumber? ){
    let params: string = "" ;
    if (customerNumber){
      params = "?customer="+customerNumber;
    }
    return this.httpClient.get('http://localhost:8081/account/list'+ params);
  }

  update(account: Account){
    return this.httpClient.put('http://localhost:8081/account/accountput', account);
  }

  insert(account: Account){
    return this.httpClient.post('http://localhost:8081/account/accountpost', account);
  }

  delete(account){
    return this.httpClient.delete('http://localhost:8081/account/accountdelete/'+ account);
  }
}
 