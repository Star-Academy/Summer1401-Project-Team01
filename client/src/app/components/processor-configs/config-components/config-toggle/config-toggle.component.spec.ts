import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigToggleComponent} from './config-toggle.component';

describe('ConfigToggleComponent', () => {
    let component: ConfigToggleComponent;
    let fixture: ComponentFixture<ConfigToggleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConfigToggleComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfigToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
