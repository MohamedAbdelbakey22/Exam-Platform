import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchangepasswordComponent } from './schangepassword.component';

describe('SchangepasswordComponent', () => {
  let component: SchangepasswordComponent;
  let fixture: ComponentFixture<SchangepasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchangepasswordComponent]
    });
    fixture = TestBed.createComponent(SchangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
