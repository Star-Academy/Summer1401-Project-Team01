import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathOperationConfigComponent } from './math-operation-config.component';

describe('MathOperationConfigComponent', () => {
  let component: MathOperationConfigComponent;
  let fixture: ComponentFixture<MathOperationConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathOperationConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MathOperationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
