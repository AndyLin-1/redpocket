import { TestBed } from '@angular/core/testing';

import { RedpocketService } from './redpocket.service';

describe('RedpocketService', () => {
  let service: RedpocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedpocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
