import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuestionComponent } from './show-question.component';

describe('ShowQuestionComponent', () => {
  let component: ShowQuestionComponent;
  let fixture: ComponentFixture<ShowQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
