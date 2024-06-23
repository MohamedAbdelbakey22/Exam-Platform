import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DconfirmpasswordComponent } from './dconfirmpassword.component';

describe('DconfirmpasswordComponent', () => {
  let component: DconfirmpasswordComponent;
  let fixture: ComponentFixture<DconfirmpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DconfirmpasswordComponent]
    });
    fixture = TestBed.createComponent(DconfirmpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
