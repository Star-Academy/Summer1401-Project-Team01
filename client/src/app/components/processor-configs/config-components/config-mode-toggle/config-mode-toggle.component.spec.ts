import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigModeToggleComponent } from './config-mode-toggle.component';

describe('ConfigModeToggleComponent', () => {
  let component: ConfigModeToggleComponent;
  let fixture: ComponentFixture<ConfigModeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigModeToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigModeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
