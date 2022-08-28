import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PipelineDesignerComponent} from './pipeline-designer.component';

describe('PipelineDesignerComponent', () => {
    let component: PipelineDesignerComponent;
    let fixture: ComponentFixture<PipelineDesignerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PipelineDesignerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PipelineDesignerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
