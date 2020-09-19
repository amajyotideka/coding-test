import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CONFIG_URL } from '../../../assets/global-config';
import { Enrollee } from '../../component/modal/enrollee.modal';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  readonly serviceURL = CONFIG_URL;
  constructor(private httpClient: HttpClient) { }

  getEnrollees(): Observable<Enrollee[]> {
    return this.httpClient.get<Enrollee[]>(this.serviceURL);
  }

  getEnrollee(id): Observable<Enrollee> {
    return this.httpClient.get<Enrollee>(`${this.serviceURL}/${id}`);
  }

  updateEnrollee(enrollee: Enrollee): Observable<Enrollee> {
    return this.httpClient.put<Enrollee>(`${this.serviceURL}/${enrollee.id}`, enrollee);
  }
}
