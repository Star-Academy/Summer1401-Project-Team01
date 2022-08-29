import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JoinConfigComponent} from './join-config.component';

describe('JoinConfigComponent', () => {
    let component: JoinConfigComponent;
    let fixture: ComponentFixture<JoinConfigComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [JoinConfigComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(JoinConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
