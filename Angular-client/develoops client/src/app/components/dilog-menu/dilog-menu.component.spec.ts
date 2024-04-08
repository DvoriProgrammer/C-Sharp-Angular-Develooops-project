import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilogMenuComponent } from './dilog-menu.component';

describe('DilogMenuComponent', () => {
  let component: DilogMenuComponent;
  let fixture: ComponentFixture<DilogMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DilogMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DilogMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
