import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { EditInputComponent } from './edit-input/edit-input.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateCustomerComponent,
    HomeComponent,
    DashboardComponent,
    NavigationComponent,
    CustomerCardComponent,
    EditInputComponent,
    NotFoundComponent,
    EditCustomerComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
