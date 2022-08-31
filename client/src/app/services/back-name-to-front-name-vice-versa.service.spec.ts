import { TestBed } from '@angular/core/testing';

import { BackNameToFrontNameViceVersaService } from './back-name-to-front-name-vice-versa.service';

describe('BackNameToFrontNameViceVersaService', () => {
  let service: BackNameToFrontNameViceVersaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackNameToFrontNameViceVersaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
