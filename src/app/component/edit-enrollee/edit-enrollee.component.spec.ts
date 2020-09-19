import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnrolleeComponent } from './edit-enrollee.component';

describe('EditEnrolleeComponent', () => {
  let component: EditEnrolleeComponent;
  let fixture: ComponentFixture<EditEnrolleeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnrolleeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnrolleeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
