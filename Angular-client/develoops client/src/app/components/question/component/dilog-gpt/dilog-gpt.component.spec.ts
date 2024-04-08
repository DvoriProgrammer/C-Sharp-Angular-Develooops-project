import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilogGptComponent } from './dilog-gpt.component';

describe('DilogGptComponent', () => {
  let component: DilogGptComponent;
  let fixture: ComponentFixture<DilogGptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DilogGptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DilogGptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
