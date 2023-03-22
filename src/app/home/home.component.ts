import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CustomerService],
})
export class HomeComponent implements OnInit, OnDestroy {

  customers: Customer[] = [];
  isDeleting: any[] = [];
  searchQuery = '';
  searchQuerySubject = new Subject<string>();

  constructor(private customerService: CustomerService) {
    this.searchQuerySubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((query: any) => {
        this.search(query);
      });
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customer) => {
      this.customers = customer;
      this.isDeleting = customer.map((c) => ({
        id: c.id,
        isLoading: false,
      }));
    });
  }

  ngOnDestroy(): void {
    this.searchQuerySubject.unsubscribe();
  }

  changeValue(event: any) {
    const { value, key, customer } = event;
    this.customerService
      .updateCustomer({ ...customer, [key]: value })
      .subscribe((updatedCustomer) => {
        this.customers = this.customers.map((p) => {
          if (p.id === updatedCustomer.id) {
            return updatedCustomer;
          }
          return p;
        });
      });
  }

  delete(customer: Customer) {
    this.setIsLoading(customer, true);
    this.customerService.deleteCustomer(customer).subscribe(() => {
      this.customers = this.customers.filter((c) => c.id !== customer.id);
      this.setIsLoading(customer, false);
    });
  }

  getIsDeleting(customer: Customer) {
    return this.isDeleting.find((c) => c.id === customer.id)?.isLoading;
  }

  search(query: any) {
    this.customerService.search(query).subscribe((customers) => {
      this.customers = customers;
    });
  }

  onQuery(event: any) {
    this.searchQuerySubject.next(event.target.value);
  }

  private setIsLoading(customer: Customer, isLoading: boolean) {
    this.isDeleting = this.isDeleting.map((p) => {
      if (p.id === customer.id) {
        return { ...p, isLoading };
      }
      return p;
    });
  }

}