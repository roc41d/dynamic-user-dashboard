import { Route } from '@angular/router';

export const USERS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./user-list/list/list.component').then((comp) => comp.ListComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./user-detail/detail/detail.component').then((comp) => comp.DetailComponent),
  }
];