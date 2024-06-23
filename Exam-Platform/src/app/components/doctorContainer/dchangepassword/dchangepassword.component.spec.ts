import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DchangepasswordComponent } from './dchangepassword.component';

describe('DchangepasswordComponent', () => {
  let component: DchangepasswordComponent;
  let fixture: ComponentFixture<DchangepasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DchangepasswordComponent]
    });
    fixture = TestBed.createComponent(DchangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
