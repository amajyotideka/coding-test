import { of, throwError } from 'rxjs';

import { EnrolleListComponent } from './enrolle-list.component';
import { Enrollee } from '../modal/enrollee.modal';

describe('EnrolleListComponent', () => {
  let component: EnrolleListComponent;
  let enrollServiceSpy: { getEnrollees: jasmine.Spy };
  let messageServiceSpy: { add: jasmine.Spy };

  beforeEach(() => {
    enrollServiceSpy = jasmine.createSpyObj('EnrollService', ['getEnrollees']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    component = new EnrolleListComponent(enrollServiceSpy as any, messageServiceSpy as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()', () => {
    spyOn(component, 'getListOfEnrollee').and.stub();
    component.ngOnInit();
    expect(component.getListOfEnrollee).toHaveBeenCalled();
    expect(component.tableColumns.length).toEqual(5);
  });

  describe('getListOfEnrollee()', () => {
    it('should test when getEnrollees return data successfully', () => {
      enrollServiceSpy.getEnrollees.and.returnValue(of([]));
      component.getListOfEnrollee();
      expect(enrollServiceSpy.getEnrollees).toHaveBeenCalled();
    });

    it('should test when getEnrollees returns fail', () => {
      enrollServiceSpy.getEnrollees.and.returnValue(throwError(''));
      component.getListOfEnrollee();
      expect(enrollServiceSpy.getEnrollees).toHaveBeenCalled();
      expect(component.failedToGetEnrollees).toBeTrue();
    });
  });

  describe('openEditEnroll()', () => {
    it('should test when input parameter has proper data', () => {
      const mockEnrollee: Enrollee = {
        id: 'test-id',
        name: 'test-name',
        active: true
      };
      component.openEditEnroll(mockEnrollee);
      expect(component.selectedEnrollee).toBe(mockEnrollee);
      expect(component.showDialog).toBeTrue();
    });

    it('should test when input parameter is null', () => {
      component.openEditEnroll(null);
      expect(component.selectedEnrollee).toBe(null);
      expect(component.showDialog).toBeTrue();
    });
  });

  describe('onHideDialog()', () => {
    it('should test when isUpdatedSuccessfully is true', () => {
      spyOn(component, 'getListOfEnrollee').and.stub();
      component.onHideDialog(true);
      expect(component.getListOfEnrollee).toHaveBeenCalled();
      expect(component.showDialog).toBeFalse();
    });

    it('should test when isUpdatedSuccessfully is false', () => {
      spyOn(component, 'getListOfEnrollee').and.stub();
      component.onHideDialog(false);
      expect(component.getListOfEnrollee).not.toHaveBeenCalled();
      expect(component.showDialog).toBeFalse();
    });
  });
});
