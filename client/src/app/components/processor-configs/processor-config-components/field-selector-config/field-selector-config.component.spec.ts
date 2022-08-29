import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FieldSelectorConfigComponent} from './field-selector-config.component';

describe('FieldSelectorConfigComponent', () => {
    let component: FieldSelectorConfigComponent;
    let fixture: ComponentFixture<FieldSelectorConfigComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FieldSelectorConfigComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FieldSelectorConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
