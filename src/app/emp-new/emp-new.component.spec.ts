import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpNewComponent } from './emp-new.component';

describe('EmpNewComponent', () => {
  let component: EmpNewComponent;
  let fixture: ComponentFixture<EmpNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpNewComponent]
    });
    fixture = TestBed.createComponent(EmpNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
