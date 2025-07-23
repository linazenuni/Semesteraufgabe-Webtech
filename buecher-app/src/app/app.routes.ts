import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'buecherliste',
    loadComponent: () =>
      import('./seiten/buecher-liste').then(m => m.BuecherListe)
  },
  {
    path: '',
    redirectTo: 'buecherliste',
    pathMatch: 'full'
  }
];
