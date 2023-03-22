import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.css']
})
export class EditInputComponent {
  @Input() value?: string | number = '';
  @Output() valueChange = new EventEmitter<string | number>();

  public showInput = false;

  onEdit() {
    this.showInput = true;
    this.valueChange.emit(this.value);
  }
}
