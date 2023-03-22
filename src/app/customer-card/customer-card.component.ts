import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent {
  @Input() customer?: Customer;
  @Input() isDeleting = false;

  @Output() changeValue = new EventEmitter<any>();
  @Output() delete = new EventEmitter<Customer>();

  onChangeValue(value: any, key: string) {
    this.changeValue.emit({ value, key: key, customer: this.customer });
  }

  onDelete() {
    this.delete.emit(this.customer);
  }
}
