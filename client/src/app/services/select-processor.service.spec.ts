import {TestBed} from '@angular/core/testing';

import {SelectProcessorService} from './select-processor.service';

describe('SelectProcessorService', () => {
    let service: SelectProcessorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SelectProcessorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
