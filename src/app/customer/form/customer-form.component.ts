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
      customernumber:[''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      username: [''],
      password: [''],
      phonenumber: ['', Validators.required],
      phonetype: ['', Validators.required]
    });
    this.updateData();
}

  submitData(){
    let customer: Customer = new Customer();
    customer.customernumber = this.customerFormGroup.controls['customernumber'].value;
    customer.firstname = this.customerFormGroup.controls['firstname'].value;
    customer.lastname = this.customerFormGroup.controls['lastname'].value;
    customer.birthdate = this.customerFormGroup.controls['birthdate'].value;
    customer.username = this.customerFormGroup.controls['username'].value;
    customer.password = this.customerFormGroup.controls['password'].value;
    customer.phonenumber = this.customerFormGroup.controls['phonenumber'].value;
    customer.phonetype = this.customerFormGroup.controls['phonetype'].value;
    
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
      this.customerFormGroup.controls['customernumber'].setValue(this.customer.customernumber);
      this.customerFormGroup.controls['firstname'].setValue(this.customer.firstname);
      this.customerFormGroup.controls['lastname'].setValue(this.customer.lastname);
      this.customerFormGroup.controls['birthdate'].setValue(this.customer.birthdate);
      this.customerFormGroup.controls['username'].setValue(this.customer.username);
      this.customerFormGroup.controls['password'].setValue(this.customer.password);
      this.customerFormGroup.controls['phonenumber'].setValue(this.customer.phonenumber);
      this.customerFormGroup.controls['phonetype'].setValue(this.customer.phonetype);
    }
  }

  insertData(){
    let customer: Customer = new Customer();
    customer.customernumber = this.customerFormGroup.controls['customernumber'].value;
    customer.firstname = this.customerFormGroup.controls['firstname'].value;
    customer.lastname = this.customerFormGroup.controls['lastname'].value;
    customer.birthdate = this.customerFormGroup.controls['birthdate'].value;
    customer.username = this.customerFormGroup.controls['username'].value;
    customer.password = this.customerFormGroup.controls['password'].value;
    customer.phonenumber = this.customerFormGroup.controls['phonenumber'].value;
    customer.phonetype = this.customerFormGroup.controls['phonetype'].value;
    
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
