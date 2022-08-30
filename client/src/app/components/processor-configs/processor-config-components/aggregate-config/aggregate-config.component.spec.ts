import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AggregateConfigComponent} from './aggregate-config.component';

describe('AggregateConfigComponent', () => {
    let component: AggregateConfigComponent;
    let fixture: ComponentFixture<AggregateConfigComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AggregateConfigComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AggregateConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
