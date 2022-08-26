import {TestBed} from '@angular/core/testing';

import {DiagramNodeService} from './diagram-node.service';

describe('DiagramNodeService', () => {
    let service: DiagramNodeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DiagramNodeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
