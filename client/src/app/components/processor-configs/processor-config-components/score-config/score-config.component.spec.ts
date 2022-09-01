import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreConfigComponent } from './score-config.component';

describe('ScoreConfigComponent', () => {
  let component: ScoreConfigComponent;
  let fixture: ComponentFixture<ScoreConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
