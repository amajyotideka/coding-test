import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { EnrollService } from '../../service/enroll/enroll.service';
import { Enrollee } from '../modal/enrollee.modal';

@Component({
  selector: 'app-enrolle-list',
  templateUrl: './enrolle-list.component.html',
  styleUrls: ['./enrolle-list.component.scss']
})
export class EnrolleListComponent implements OnInit {
  cols: any[];
  enrolleeList: Enrollee[];

  display: boolean = false;
  selectedEnrollee: Enrollee;
  isFailedToGetEnrollee: boolean = false;

  constructor(
    private enrollService: EnrollService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.getListOfEnrollee();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'active', header: 'Status' },
      { field: 'dateOfBirth', header: 'Date Of  Birth' },
      { field: 'edit', header: 'Edit' }
  ];
  }

  getListOfEnrollee(): void {
    this.isFailedToGetEnrollee = false;
    this.enrolleeList = [];
    this.enrollService.getEnrollees().subscribe((enrolleeList: Enrollee[]) => {
      this.enrolleeList = enrolleeList;
    }, () => {
      this.isFailedToGetEnrollee = true;
    });
  }

  openEditEnroll(rowData: Enrollee): void {
    this.selectedEnrollee = rowData;
    this.display = true;
  }

  hideDialog(isUpdatedSuccessfully: boolean): void {
    if (isUpdatedSuccessfully) {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Updated successfully'});
      this.getListOfEnrollee();
    }
    this.display = false;
  }
}
