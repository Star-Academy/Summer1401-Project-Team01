import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProcessorConfigsComponent} from './processor-configs.component';

describe('ProcessorConfigsComponent', () => {
    let component: ProcessorConfigsComponent;
    let fixture: ComponentFixture<ProcessorConfigsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProcessorConfigsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProcessorConfigsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
