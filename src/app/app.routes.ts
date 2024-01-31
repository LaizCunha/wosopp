import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'settings/arenas-wosopp/form-arena',
    loadComponent: () => import('./pages/settings/arenas-wosopp/form-arena/form-arena.page').then( m => m.FormArenaPage)
  },

];
