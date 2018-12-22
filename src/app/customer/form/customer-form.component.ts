import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  @Input()
  customer: Customer;

  @Output()
  result = new EventEmitter();

  customerFormGroup: FormGroup;

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit() { //diinit pertama kali
    this.customerFormGroup = this.formBuilder.group({
      customerNumber:[''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      username: [''],
      password: [''],
      phoneNumber: ['', Validators.required],
      phoneType: ['', Validators.required]
    });
    this.updateData();
}

  submitData(){
    let customer: Customer = new Customer();
    customer.customerNumber = this.customerFormGroup.controls['customerNumber'].value;
    customer.firstName = this.customerFormGroup.controls['firstName'].value;
    customer.lastName = this.customerFormGroup.controls['lastName'].value;
    customer.birthDate = this.customerFormGroup.controls['birthDate'].value;
    customer.username = this.customerFormGroup.controls['username'].value;
    customer.password = this.customerFormGroup.controls['password'].value;
    customer.phoneNumber = this.customerFormGroup.controls['phoneNumber'].value;
    customer.phoneType = this.customerFormGroup.controls['phoneType'].value;
    
    this.customerService.update(customer).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
        location.href = '/customer-list';
    },(err)=>{
      alert('error '+JSON.stringify(err));
    }
    );
  }

  updateData(){
    this.setDataToForm(this.customer);
  }

  setDataToForm(customer){
    if(customer){
      this.customerFormGroup.controls['customerNumber'].setValue(this.customer.customerNumber);
      this.customerFormGroup.controls['firstName'].setValue(this.customer.firstName);
      this.customerFormGroup.controls['lastName'].setValue(this.customer.lastName);
      this.customerFormGroup.controls['birthDate'].setValue(this.customer.birthDate);
      this.customerFormGroup.controls['username'].setValue(this.customer.username);
      this.customerFormGroup.controls['password'].setValue(this.customer.password);
      this.customerFormGroup.controls['phoneNumber'].setValue(this.customer.phoneNumber);
      this.customerFormGroup.controls['phoneType'].setValue(this.customer.phoneType);
    }
  }

  insertData(){
    let customer: Customer = new Customer();
    customer.customerNumber = this.customerFormGroup.controls['customerNumber'].value;
    customer.firstName = this.customerFormGroup.controls['firstName'].value;
    customer.lastName = this.customerFormGroup.controls['lastName'].value;
    customer.birthDate = this.customerFormGroup.controls['birthDate'].value;
    customer.username = this.customerFormGroup.controls['username'].value;
    customer.password = this.customerFormGroup.controls['password'].value;
    customer.phoneNumber = this.customerFormGroup.controls['phoneNumber'].value;
    customer.phoneType = this.customerFormGroup.controls['phoneType'].value;
    
    this.customerService.insert(customer).subscribe(
      (response)=>{
        console.log(JSON.stringify(response));
        this.result.emit(true);
        location.href = '/customer-list';
    },(err)=>{
      alert('error '+JSON.stringify(err));
    }
    );
  }

  cancelChanges(){
    this.result.emit(true);
  }

}
