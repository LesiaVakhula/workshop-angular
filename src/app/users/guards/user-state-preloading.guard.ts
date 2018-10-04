import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { AppState, getUsersLoaded } from './../../core/+store';
import * as UsersActions from './../../core/+store/users/users.actions';

import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class UsersStatePreloadingGuard implements CanActivate {

  constructor(
    private store: Store<AppState>
  ) { }

  canActivate() {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(getUsersLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new UsersActions.GetUsers());
        }
      }),
      take(1)
    );
  }
}
