import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { getUser, selectError, selectLoading } from '../data-access/store/reducers';
import { ActivatedRoute } from '@angular/router';
import { userDetailActions } from '../data-access/store/actions';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../../shared/ui/loader.component';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    LoaderComponent,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  data$ = combineLatest({
    isLoading: this.store.select(selectLoading),
    user: this.store.select(getUser),
    error: this.store.select(selectError),
  })

  ngOnInit(): void {
    const userId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.store.dispatch(userDetailActions.getUserDetails({ userId }));
  }
}
