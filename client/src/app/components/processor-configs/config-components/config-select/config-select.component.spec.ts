import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigSelectComponent} from './config-select.component';

describe('ConfigSelectComponent', () => {
    let component: ConfigSelectComponent;
    let fixture: ComponentFixture<ConfigSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConfigSelectComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfigSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
