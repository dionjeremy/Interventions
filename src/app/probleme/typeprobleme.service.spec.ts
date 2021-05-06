import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TypeProblemeService } from './typeprobleme.service';

describe('TypeproblemeService', () => {
  let service: TypeProblemeService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule]
      
    })
    .compileComponents();
  });



  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeProblemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
