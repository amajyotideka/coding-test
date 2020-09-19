import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Enrollee } from '../../component/modal/enrollee.modal';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  constructor(private httpClient: HttpClient) { }

  getEnrollees(): Observable<Enrollee[]> {
    return this.httpClient.get<Enrollee[]>('http://localhost:8080/enrollees');
  }

  getEnrollee(id): Observable<Enrollee> {
    return this.httpClient.get<Enrollee>(`http://localhost:8081/enrollees/${id}`);
  }

  updateEnrollee(enrollee: Enrollee) {
    return this.httpClient.put(`http://localhost:8080/enrollees/${enrollee.id}`, enrollee);
  }

}
