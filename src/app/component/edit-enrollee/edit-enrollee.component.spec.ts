import { FormControl, FormGroup, Validators } from '@angular/forms';

import { of, throwError } from 'rxjs';

import { EditEnrolleeComponent } from './edit-enrollee.component';

describe('EditEnrolleeComponent', () => {
  let component: EditEnrolleeComponent;
  let enrollServiceSpy: { updateEnrollee: jasmine.Spy };

  beforeEach(() => {
    enrollServiceSpy = jasmine.createSpyObj('EnrollService', ['updateEnrollee']);
    component = new EditEnrolleeComponent(enrollServiceSpy as  any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it ('should test when enrrolleeData has data', () => {
      component.enrrolleeData = {
        id: 'test-id',
        name: 'test-name',
        active: true,
        dateOfBirth: '1953-02-16'
      };
      component.ngOnInit();
      expect(component.enrolleeForm).toBeDefined();
    });

    it ('should test when enrrolleeData is null', () => {
      component.enrrolleeData = null;
      component.ngOnInit();
      expect(component.enrolleeForm).toBeDefined();
    });
  });

  describe('submit()', () => {
    it ('should test when form data is valid and enrrolleeData exists and service return is successfull', () => {
      component.enrrolleeData = {
        id: 'test-id',
        name: 'test-name',
        active: true,
        dateOfBirth: '1953-02-16'
      };

      component.enrolleeForm = new FormGroup({
        id: new FormControl({ value: component.enrrolleeData?.id, disabled: true}, [Validators.required]),
        active: new FormControl(component.enrrolleeData?.active, [Validators.required]),
        name: new FormControl(component.enrrolleeData?.name, [Validators.required]),
        dateOfBirth: new FormControl({ value: component.enrrolleeData.dateOfBirth, disabled: true}),
      });

      spyOn(component.hideDialog, 'emit');
      enrollServiceSpy.updateEnrollee.and.returnValue(of(component.enrrolleeData));
      component.submit();
      expect(enrollServiceSpy.updateEnrollee).toHaveBeenCalledWith(component.enrrolleeData);
      expect(component.hideDialog.emit).toHaveBeenCalledWith(true);
    });

    it ('should test when form data is valid and enrrolleeData exists and service returns failed', () => {
      component.enrrolleeData = {
        id: 'test-id',
        name: 'test-name',
        active: true,
        dateOfBirth: '1953-02-16'
      };

      component.enrolleeForm = new FormGroup({
        id: new FormControl({ value: component.enrrolleeData?.id, disabled: true}, [Validators.required]),
        active: new FormControl(component.enrrolleeData?.active, [Validators.required]),
        name: new FormControl(component.enrrolleeData?.name, [Validators.required]),
        dateOfBirth: new FormControl({ value: component.enrrolleeData.dateOfBirth, disabled: true}),
      });

      enrollServiceSpy.updateEnrollee.and.returnValue(throwError(''));
      component.submit();
      expect(enrollServiceSpy.updateEnrollee).toHaveBeenCalledWith(component.enrrolleeData);
      expect(component.isUpdateFailed).toBeTrue();
    });

    it ('should test when enrrolleeData is null', () => {
      component.enrrolleeData = null;
      enrollServiceSpy.updateEnrollee.and.returnValue(throwError(''));
      component.submit();
      expect(enrollServiceSpy.updateEnrollee).not.toHaveBeenCalled();
      expect(component.isUpdateFailed).toBeFalse();
    });
  });

  it('should test onClose', () => {
    spyOn(component.hideDialog, 'emit');
    component.onClose();
    expect(component.hideDialog.emit).toHaveBeenCalledWith(false);
  });
});
