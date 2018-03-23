import { TestBed, inject } from '@angular/core/testing';

import { TipoCitaService } from './tipo-cita.service';

describe('TipoCitaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoCitaService]
    });
  });

  it('should be created', inject([TipoCitaService], (service: TipoCitaService) => {
    expect(service).toBeTruthy();
  }));
});
