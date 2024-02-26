import { TestBed } from '@angular/core/testing';

import { BlacklistTokenService } from './blacklist-token.service';

describe('BlacklistTokenService', () => {
  let service: BlacklistTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlacklistTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
