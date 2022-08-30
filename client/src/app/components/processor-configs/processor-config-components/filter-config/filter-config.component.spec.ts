import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterConfigComponent} from './filter-config.component';

describe('FilterConfigComponent', () => {
    let component: FilterConfigComponent;
    let fixture: ComponentFixture<FilterConfigComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FilterConfigComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
