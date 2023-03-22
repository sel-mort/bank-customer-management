import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { CustomerFormData } from './models/customer-form-data.model';
import { Customer } from './models/customer.model';

const API_URL = 'http://localhost:3000/customers';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL);
  }

  updateCustomer(Customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${API_URL}/${Customer.id}`, Customer);
  }

  deleteCustomer(Customer: Customer) {
    return this.http.delete(`${API_URL}/${Customer.id}`);
  }

  search(name: string | number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?q=${name}`);
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}/${id}`);
  }

  createCustomer(CustomerFormData: Customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL, CustomerFormData);
  }

  getCustomerByParam(param: string, value: string | number): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?${param}=${value}`);
  }
}
