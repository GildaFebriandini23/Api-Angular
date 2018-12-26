import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  getList(){
    return this.httpClient.get('http://localhost:3000/customers');
  }

  update(customer: Customer){
    return this.httpClient.put('http://localhost:3000/customer', customer);
  }

  insert(customer: Customer){
    return this.httpClient.post('http://localhost:3000/customer', customer);
  }

  delete(customer){
    return this.httpClient.delete('http://localhost:3000/customer/'+customer);
  }
}
