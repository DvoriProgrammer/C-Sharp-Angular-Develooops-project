import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyQuestionComponent } from './daily-question.component';

describe('DailyQuestionComponent', () => {
  let component: DailyQuestionComponent;
  let fixture: ComponentFixture<DailyQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
