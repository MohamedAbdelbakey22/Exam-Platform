import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexamComponent } from './sexam.component';

describe('SexamComponent', () => {
  let component: SexamComponent;
  let fixture: ComponentFixture<SexamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SexamComponent]
    });
    fixture = TestBed.createComponent(SexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
