import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigNumberInputComponent } from './config-number-input.component';

describe('ConfigNumberInputComponent', () => {
  let component: ConfigNumberInputComponent;
  let fixture: ComponentFixture<ConfigNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigNumberInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
