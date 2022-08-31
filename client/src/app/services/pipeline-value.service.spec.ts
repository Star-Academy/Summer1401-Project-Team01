import { TestBed } from '@angular/core/testing';

import { PipelineValueService } from './pipeline-value.service';

describe('PipelineValueService', () => {
  let service: PipelineValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipelineValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
