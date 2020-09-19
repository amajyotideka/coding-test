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
  tableColumns: any[];
  enrolleeList: Enrollee[];
  showDialog = false;
  selectedEnrollee: Enrollee;
  failedToGetEnrollees = false;

  constructor(
    private enrollService: EnrollService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.getListOfEnrollee();

    this.tableColumns = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'active', header: 'Status' },
      { field: 'dateOfBirth', header: 'Date Of  Birth' },
      { field: 'edit', header: 'Actions' }
    ];
  }

  getListOfEnrollee(): void {
    this.failedToGetEnrollees = false;
    this.enrolleeList = [];
    this.enrollService.getEnrollees().subscribe((enrolleeList: Enrollee[]) => {
      this.enrolleeList = enrolleeList;
    }, () => {
      this.failedToGetEnrollees = true;
    });
  }

  openEditEnroll(rowData: Enrollee): void {
    this.selectedEnrollee = rowData;
    this.showDialog = true;
  }

  onHideDialog(isUpdatedSuccessfully: boolean): void {
    if (isUpdatedSuccessfully) {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Updated successfully'});
      this.getListOfEnrollee();
    }
    this.showDialog = false;
  }
}
