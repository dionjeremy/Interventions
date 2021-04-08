import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TypeproblemeService } from './typeprobleme.service';

describe('TypeproblemeService', () => {
  let service: TypeproblemeService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule]
      
    })
    .compileComponents();
  });



  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeproblemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
