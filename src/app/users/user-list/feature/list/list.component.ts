import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userActions } from '../../data-access/store/actions';
import { combineLatest } from 'rxjs';
import { getUsers, selectError, selectLoading, selectTotal } from '../../data-access/store/reducers';
import { AsyncPipe } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { LoaderComponent } from '../../../../shared/ui/loader.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    LoaderComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  private currentPage = 1;
  private store = inject(Store);

  data$ = combineLatest({
    isLoading: this.store.select(selectLoading),
    users: this.store.select(getUsers),
    error: this.store.select(selectError),
    total: this.store.select(selectTotal),
  })

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number): void {
    this.store.dispatch(userActions.getUsers({ page }));
  }
}
