import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSampleComponent } from './show-sample.component';

describe('ShowSampleComponent', () => {
  let component: ShowSampleComponent;
  let fixture: ComponentFixture<ShowSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
