import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuecherListe } from './buecher-liste';

describe('BuecherListe', () => {
  let component: BuecherListe;
  let fixture: ComponentFixture<BuecherListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuecherListe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuecherListe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
