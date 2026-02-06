import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./screens/home/home').then((m) => m.Home),
  },
  { path: '**', redirectTo: '' },
];
