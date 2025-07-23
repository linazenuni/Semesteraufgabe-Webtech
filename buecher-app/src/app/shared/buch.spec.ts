import { TestBed } from '@angular/core/testing';

import { Buch } from './buch';

describe('Buch', () => {
  let service: Buch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Buch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
