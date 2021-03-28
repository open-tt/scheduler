import { TestBed } from '@angular/core/testing';

import { ResponseMappingInterceptor } from './response-mapping.interceptor';

describe('DateInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ResponseMappingInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ResponseMappingInterceptor = TestBed.inject(
      ResponseMappingInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
