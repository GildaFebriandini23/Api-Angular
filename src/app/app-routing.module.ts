import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer/list/customer-list.component';
import { CustomerFormComponent } from './customer/form/customer-form.component';
import { AccountListComponent } from './account/list/account-list.component';
import { TransactionListComponent } from './transaction/list/transaction-list.component';
import { AccountFormComponent } from './account/form/account-form.component';
import { TransactionFormComponent } from './transaction/form/transaction-form.component';
import { CreateAccountComponent } from './account/create/create-account.component';

const routes: Routes = [
  {
    path:'customer-list',
    component: CustomerListComponent
  },
  {
    path:'customer-form',
    component: CustomerFormComponent
  },
  {
    path:'account-list',
    component: AccountListComponent
  },
  {
    path:'account-form',
    component: AccountFormComponent
  },
  {
    path:'transaction-list',
    component: TransactionListComponent
  },
  {
    path:'transaction-form',
    component: TransactionFormComponent
  },
  {
    path:'create-form',
    component: CreateAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
