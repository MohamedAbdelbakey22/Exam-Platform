import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DforgetpasswordComponent } from './dforgetpassword.component';

describe('DforgetpasswordComponent', () => {
  let component: DforgetpasswordComponent;
  let fixture: ComponentFixture<DforgetpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DforgetpasswordComponent]
    });
    fixture = TestBed.createComponent(DforgetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
