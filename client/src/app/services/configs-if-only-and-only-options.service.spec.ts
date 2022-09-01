import {TestBed} from '@angular/core/testing';

import {ConfigsIfOnlyAndOnlyOptionsService} from './configs-if-only-and-only-options.service';

describe('ConfigsIfOnlyAndOnlyOptionsService', () => {
    let service: ConfigsIfOnlyAndOnlyOptionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ConfigsIfOnlyAndOnlyOptionsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
