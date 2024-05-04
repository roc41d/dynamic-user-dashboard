import { Route } from '@angular/router';

export const USERS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./user-list/list/list.component').then((comp) => comp.ListComponent),
  },
];