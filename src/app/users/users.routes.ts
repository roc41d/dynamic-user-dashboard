import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as getUserDetailEffect from './user-detail/data-access/store/effects';
import { userDetailFeatureKey, userDetailReducer } from './user-detail/data-access/store/reducers';

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
    providers: [
        provideState(userDetailFeatureKey, userDetailReducer),
        provideEffects(getUserDetailEffect),
    ]
  }
];