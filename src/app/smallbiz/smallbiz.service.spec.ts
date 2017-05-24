/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmallbizService } from './smallbiz.service';

describe('SmallbizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmallbizService]
    });
  });

  it('should ...', inject([SmallbizService], (service: SmallbizService) => {
    expect(service).toBeTruthy();
  }));
});
