import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import * as RouterActions from './../../core/+store/router/router.actions';

// rxjs
import { Observable, of } from 'rxjs';
import { delay, map, catchError, finalize, tap, take } from 'rxjs/operators';

// NgRx
import { Store, select } from '@ngrx/store';
import { AppState, getSelectedUserByUrl } from './../../core/+store';
import * as UsersActions from './../../core/+store/users/users.actions';

import { User } from './../models/user.model';
// import { UserObservableService } from './../services';
import { SpinnerService } from '../../core';

@Injectable()
export class UserResolveGuard implements Resolve<User> {
  constructor(
    // private userObservableService: UserObservableService,
    private store: Store<AppState>,
    // private router: Router,
    private spinner: SpinnerService
  ) {}

  // resolve(route: ActivatedRouteSnapshot): Observable<User | null> {
  //   console.log('UserResolve Guard is called');

  //   if (!route.paramMap.has('userID')) {
  //     return of(new User(null, '', ''));
  //   }

  //   this.spinner.show();
  //   const id = +route.paramMap.get('userID');

  //   return this.userObservableService.getUser(id).pipe(
  //     delay(2000),
  //     map(user => {
  //       if (user) {
  //         return user;
  //       } else {
  //         this.router.navigate(['/users']);
  //         return of(null);
  //       }
  //     }),
  //     catchError(() => {
  //       this.router.navigate(['/users']);
  //       return of(null);
  //     }),
  //     finalize(() => this.spinner.hide())
  //   );
  // }
  resolve(): Observable<User> | null {
    console.log('UserResolve Guard is called');
    this.spinner.show();

    return this.store.pipe(
      select(getSelectedUserByUrl),
      tap(user => this.store.dispatch(new UsersActions.SetOriginalUser(user))),
      delay(2000),
      map(user => {
        if (user) {
          return user;
        } else {
          // this.router.navigate(['/users']);
          this.store.dispatch(new RouterActions.Go({
            path: ['/users']
          }));
          return null;
        }
      }),
      take(1),
      catchError(() => {
        // this.router.navigate(['/users']);
        this.store.dispatch(new RouterActions.Go({
          path: ['/users']
        }));
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
