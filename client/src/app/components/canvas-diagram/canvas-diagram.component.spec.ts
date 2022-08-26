import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CanvasDiagramComponent} from './canvas-diagram.component';

describe('CanvasDiagramComponent', () => {
    let component: CanvasDiagramComponent;
    let fixture: ComponentFixture<CanvasDiagramComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CanvasDiagramComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CanvasDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
