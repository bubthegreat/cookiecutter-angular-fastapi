import { TestBed } from '@angular/core/testing';

import { GlobalStateService } from './global-state.service';

describe('GlobalStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalStateService = TestBed.get(GlobalStateService);
    expect(service).toBeTruthy();
  });
});
