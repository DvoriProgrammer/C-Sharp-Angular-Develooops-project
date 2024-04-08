import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuestionComponent } from './card-question.component';

describe('CardQuestionComponent', () => {
  let component: CardQuestionComponent;
  let fixture: ComponentFixture<CardQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
