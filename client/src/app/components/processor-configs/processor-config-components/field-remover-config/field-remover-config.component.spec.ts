import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FieldRemoverConfigComponent} from './field-remover-config.component';

describe('FieldRemoverConfigComponent', () => {
    let component: FieldRemoverConfigComponent;
    let fixture: ComponentFixture<FieldRemoverConfigComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FieldRemoverConfigComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FieldRemoverConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
