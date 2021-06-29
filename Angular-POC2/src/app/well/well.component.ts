import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-well',
  templateUrl: './well.component.html',
  styleUrls: ['./well.component.scss'],
})
export class WellComponent implements OnInit {
  wellForm: FormGroup;
  isSubmitted: boolean = false;
  @Output() newWellEvent = new EventEmitter();
  @Input('patchSelectedWell') set _patchForm(value: any) {
    if (this.wellForm && value) {
      this.fillFormDetails(value);
    }
  }
  constructor(private fb: FormBuilder) {
    this.wellForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', [Validators.required, this.allowedWellType.bind(this)]],
      source: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  fillFormDetails(value) {
    this.wellForm.get('name').patchValue(value.name);
    this.wellForm.get('type').patchValue(value.type);
    this.wellForm.get('source').patchValue(value.source);
    this.wellForm.get('source').disable();
  }

  onAddWell() {
    this.isSubmitted = true;
    if (this.wellForm.valid) {
      this.newWellEvent.emit(this.wellForm.value);
    }
  }

  allowedWellType(control: AbstractControl): { [key: string]: any } | null {
    let value = control.value.toLowerCase().trim();
    const allowedWellType = ['esp', 'na'];
    if (allowedWellType.includes(value)) {
      return null;
    } else {
      return {
        notallowedWellType: true,
      };
    }
  }
}
