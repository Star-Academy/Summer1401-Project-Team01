import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTypesComponent } from './column-types.component';

describe('ColumnTypesComponent', () => {
  let component: ColumnTypesComponent;
  let fixture: ComponentFixture<ColumnTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
