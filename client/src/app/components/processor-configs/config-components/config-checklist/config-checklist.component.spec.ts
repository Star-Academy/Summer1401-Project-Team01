import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigChecklistComponent } from './config-checklist.component';

describe('ConfigChecklistComponent', () => {
  let component: ConfigChecklistComponent;
  let fixture: ComponentFixture<ConfigChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
