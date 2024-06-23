import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaccountComponent } from './confirmaccount.component';

describe('ConfirmaccountComponent', () => {
  let component: ConfirmaccountComponent;
  let fixture: ComponentFixture<ConfirmaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmaccountComponent]
    });
    fixture = TestBed.createComponent(ConfirmaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
