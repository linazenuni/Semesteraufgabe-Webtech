import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BuchService } from '../shared/buch-service';
import { Buch } from '../shared/buch';

@Component({
  selector: 'app-buecher-liste',
  templateUrl: './buecher-liste.html',
  styleUrls: ['./buecher-liste.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class BuecherListe implements OnInit {
  buecher: Buch[] = [];
  fehlerBeimLaden = false;
  buchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private buchService: BuchService
  ) {
    this.buchForm = this.fb.group({
      titel: ['', Validators.required],
      autor: ['', Validators.required]
      
    });
  }

  ngOnInit(): void {
    this.buecherLaden();
  }

  
  
  buecherLaden(): void {
    this.buchService.getBuecher().subscribe({
      next: (daten) => {
        this.buecher = daten;
        this.fehlerBeimLaden = false;
            
      },
      error: (err) => {
      console.error('Fehler beim Laden der Bücher:', err);
      this.fehlerBeimLaden = true;
    }
  });
}
      
  

buchHinzufuegen(): void {
    if (this.buchForm.valid) {
      const neuesBuch: Buch = this.buchForm.value;
      this.buchService.addBuch(neuesBuch).subscribe({
        next: (eingefuegtesBuch) => {
          this.buecher.push(eingefuegtesBuch);
          this.buchForm.reset();
        },
        error: (err) => console.error('Fehler beim Hinzufügen:', err)
      });
    }
  }

  
  buchLoeschen(index: number): void {
    const buch = this.buecher[index];
    if (buch.id != null) {
      this.buchService.deleteBuch(buch.id).subscribe({
        next: () => this.buecher.splice(index, 1),
        error: (err) => console.error('Fehler beim Löschen:', err)
      });
    } else {
      console.warn('Buch hat keine ID – Löschen nicht möglich:', buch);
    }
  }
}



