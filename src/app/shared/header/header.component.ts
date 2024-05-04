import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { userActions } from '../../users/user-list/data-access/store/actions';
import {MatIconModule} from '@angular/material/icon';
import { ThemeService } from '../data-access/theme.service';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  public searchInput = new FormControl('');
  public themeService: ThemeService = inject(ThemeService);
  private store = inject(Store);

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(searchText => {
          if (!searchText) {
            this.store.dispatch(userActions.getUsers({ page: 1 }));
          } else {
            this.store.dispatch(userActions.updateUserSearchText({ searchText }));  
          }
        })
      )
      .subscribe();
  }

  public toggleTheme(): void{
    this.themeService.updateTheme();
  }
}
