import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolleListComponent } from './enrolle-list.component';

describe('EnrolleListComponent', () => {
  let component: EnrolleListComponent;
  let fixture: ComponentFixture<EnrolleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
