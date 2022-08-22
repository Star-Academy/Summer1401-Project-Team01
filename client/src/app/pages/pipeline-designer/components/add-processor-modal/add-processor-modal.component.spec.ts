import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddProcessorModalComponent} from './add-processor-modal.component';

describe('AddProcessorModalComponent', () => {
    let component: AddProcessorModalComponent;
    let fixture: ComponentFixture<AddProcessorModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddProcessorModalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddProcessorModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
