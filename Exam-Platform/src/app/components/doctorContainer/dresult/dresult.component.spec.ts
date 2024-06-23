import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DresultComponent } from './dresult.component';

describe('DresultComponent', () => {
  let component: DresultComponent;
  let fixture: ComponentFixture<DresultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DresultComponent]
    });
    fixture = TestBed.createComponent(DresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
