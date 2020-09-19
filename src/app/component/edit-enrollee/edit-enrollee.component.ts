import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { Enrollee } from '../modal/enrollee.modal';
import { EnrollService } from '../../service/enroll/enroll.service';

@Component({
  selector: 'app-edit-enrollee',
  templateUrl: './edit-enrollee.component.html',
  styleUrls: ['./edit-enrollee.component.scss']
})
export class EditEnrolleeComponent implements OnInit {

  @Input() enrrolleeData: Enrollee;
  @Output() hideDialog = new EventEmitter<boolean>();

  enrolleeForm: FormGroup;
  isUpdateFailed = false;

  constructor(private enrollService: EnrollService) { }

  ngOnInit(): void {

    const formatedDOB = this.enrrolleeData?.dateOfBirth ? formatDate(this.enrrolleeData?.dateOfBirth, 'MMM dd, yyyy', 'en') : '';

    this.enrolleeForm = new FormGroup({
      id: new FormControl({ value: this.enrrolleeData?.id, disabled: true}, [Validators.required]),
      active: new FormControl(this.enrrolleeData?.active, [Validators.required]),
      name: new FormControl(this.enrrolleeData?.name, [Validators.required]),
      dateOfBirth: new FormControl({ value: formatedDOB, disabled: true}),
    });

  }

  submit(): void {
    this.isUpdateFailed = false;
    if (this.enrolleeForm?.valid && this.enrrolleeData) {
      const formRawValues: Enrollee = this.enrolleeForm.getRawValue();
      formRawValues.dateOfBirth = formRawValues?.dateOfBirth ? formatDate(formRawValues?.dateOfBirth, 'yyyy-MM-dd', 'en') : '';
      this.enrollService.updateEnrollee(formRawValues).subscribe((a: Enrollee) => {
        this.hideDialog.emit(true);
      }, () => {
        this.isUpdateFailed = true;
      });
    }
  }

  onClose(): void {
    this.hideDialog.emit(false);
  }
}
