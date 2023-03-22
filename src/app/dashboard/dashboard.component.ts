import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  customers?: Customer[] = [];
  total: any = 0;

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customer) => {
      this.customers = customer;
    this.total = this.customers?.reduce((total: any, customer) => {
      total = total +  parseFloat(customer?.balance.toString());
      return total;
    }, 0);
    });
    
  }

  constructor(
    private customerService: CustomerService
  ) {
    
  }
}
