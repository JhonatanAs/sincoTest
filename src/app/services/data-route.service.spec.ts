import { TestBed } from '@angular/core/testing';

import { DataRouteService } from './data-route.service';

describe('DataRouteService', () => {
  let service: DataRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
