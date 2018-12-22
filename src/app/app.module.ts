import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerComponent } from './customer/customer.component';
import { CustomerFormComponent } from './customer/form/customer-form.component';
import { CustomerListComponent } from './customer/list/customer-list.component';
import { CustomerService } from './customer/customer.service';
import { AccountComponent } from './account/account.component';
import { AccountFormComponent } from './account/form/account-form.component';
import { AccountListComponent } from './account/list/account-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionFormComponent } from './transaction/form/transaction-form.component';
import { TransactionListComponent } from './transaction/list/transaction-list.component';
import { ApiPipe } from './shared/api.pipe';
import { ComboCustomerComponent } from './shared/component/customer/combo-customer.component';
import { CreateAccountComponent } from './account/create/create-account.component';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerFormComponent,
    CustomerListComponent,
    AccountComponent,
    AccountFormComponent,
    AccountListComponent,
    TransactionComponent,
    TransactionFormComponent,
    TransactionListComponent,
    ApiPipe,
    ComboCustomerComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CustomerService, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
