import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListOfPipelinesComponent} from './list-of-pipelines.component';

describe('ListOfPipelinesComponent', () => {
    let component: ListOfPipelinesComponent;
    let fixture: ComponentFixture<ListOfPipelinesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListOfPipelinesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListOfPipelinesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
