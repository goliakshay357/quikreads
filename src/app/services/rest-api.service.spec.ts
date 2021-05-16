import { TestBed } from '@angular/core/testing';

import { RestApiService } from './rest-api.service';
import {HttpClientModule} from '@angular/common/http';

describe('RestApiService', () => {
  let service: RestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(RestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
