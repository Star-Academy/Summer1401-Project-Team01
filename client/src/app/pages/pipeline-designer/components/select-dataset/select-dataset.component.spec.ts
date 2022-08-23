import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectDatasetComponent} from './select-dataset.component';

describe('SelectDatasetComponent', () => {
    let component: SelectDatasetComponent;
    let fixture: ComponentFixture<SelectDatasetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectDatasetComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectDatasetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
