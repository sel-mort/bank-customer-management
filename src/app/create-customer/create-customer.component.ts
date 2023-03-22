import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { map, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
  customerForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      firstName: new FormControl(
        '',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ),
      lastName: [
        '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)] 
      ],
      phone: [
        '', [Validators.required, Validators.pattern(/^\+?\d{3,10}$/)],
      ],
      email: [
        '', [Validators.required, Validators.email]
      ],
      gender: [
        '', [Validators.required]
      ],
      balance: [
        0, [Validators.pattern("\\d+")]
      ],
      accountNumber: [
        {
          value:(function(){ console.log(); return Math.floor(Math.random() * 1000000000)})(),
          disabled: true
        }, [Validators.required, Validators.pattern("\\d+")]
      ],
      accountType: [
        '', [Validators.required]
      ],
    });
  }

  getControl(controlName: string) {
    return this.customerForm.get(controlName);
  }

  getField(field: string) {
    return this.customerForm.get(field)?.touched;
  }

  canSubmit(): boolean {
    return this.customerForm.dirty && this.customerForm.valid;
  }

  validateAccountNumber(
    control: AbstractControl
  ): Observable<{ accountError: boolean } | null> {
    return this.customerService.getCustomerByParam('accountNumber', control.value).pipe(
      map((customer: Customer[]) => {
        if (customer.length > 0) {
          return { accountError: true };
        }
        return null;
      })
    );
  }

  submit() {
    this.isLoading = true;
    //console.log(this.customerForm.get('accountNumber')?.value);
    if (this.validateAccountNumber(this.customerForm.get('accountNumber')?.value)) {
    this.customerForm.value.accountNumber = this.customerForm.get('accountNumber')?.value;
    this.customerService
      .createCustomer(this.customerForm.value)
      .subscribe((customer: Customer) => {
        this.isLoading = false;
        this.customerForm.reset();
        this.router.navigate(['/details', customer.id]);
      });
    }
  }
}
