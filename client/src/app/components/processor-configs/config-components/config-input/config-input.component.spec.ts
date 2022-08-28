import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigInputComponent } from './config-input.component';

describe('ConfigInputComponent', () => {
  let component: ConfigInputComponent;
  let fixture: ComponentFixture<ConfigInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
