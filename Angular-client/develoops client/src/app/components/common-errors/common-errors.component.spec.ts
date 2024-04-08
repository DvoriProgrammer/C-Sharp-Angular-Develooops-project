import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonErrorsComponent } from './common-errors.component';

describe('CommonErrorsComponent', () => {
  let component: CommonErrorsComponent;
  let fixture: ComponentFixture<CommonErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonErrorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
