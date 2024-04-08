import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerListComponent } from './answer-list.component';

describe('AnswerListComponent', () => {
  let component: AnswerListComponent;
  let fixture: ComponentFixture<AnswerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
