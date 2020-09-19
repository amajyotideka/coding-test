import { of } from 'rxjs';

import { Enrollee } from '../../component/modal/enrollee.modal';
import { EnrollService } from './enroll.service';

describe('EnrollService', () => {
  let service: EnrollService;
  let httpClientSpy: { get: jasmine.Spy, put: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);
    service = new EnrollService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getEnrollees', () => {
    httpClientSpy.get.and.returnValue(of([]));
    service.getEnrollees();
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should test getEnrollee', () => {
    httpClientSpy.get.and.returnValue(of([]));
    service.getEnrollee('mockId');
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should test updateEnrollee', () => {
    const mockEnrollee: Enrollee = {
      id: 'test-id',
      name: 'test-name',
      active: true,
      dateOfBirth: '1953-02-16'
    };
    httpClientSpy.put.and.returnValue(of([]));
    service.updateEnrollee(mockEnrollee);
    expect(httpClientSpy.put).toHaveBeenCalled();
  });
});
