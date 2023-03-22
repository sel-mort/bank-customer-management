import { Component, Input } from '@angular/core';
import { Customer } from '../models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent {
  customer?: Customer;

  constructor(
    private customerService: CustomerService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(switchMap((params) => this.customerService.getById(params['id'])))
      .subscribe({
        next: (customer) => (this.customer = customer),
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });
  }
}
