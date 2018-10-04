import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';
import * as RouterActions from './../../../core/+store/router/router.actions';
// rxjs
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, getUsersOriginalUser, getSelectedUserByUrl } from './../../../core/+store';
import * as UsersActions from './../../../core/+store/users/users.actions';

import {
  AutoUnsubscribe,
  DialogService,
  CanComponentDeactivate
} from './../../../core';
import { User } from './../../models/user.model';
// import { UserObservableService } from './../../services';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
@AutoUnsubscribe()
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: User;
  private sub: Subscription;

  constructor(
    private store: Store<AppState>,
    // private route: ActivatedRoute,
    // private location: Location,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    // this.route.data.subscribe(data => {
    //   this.user = { ...data.user };
    // });

    this.sub = this.store.pipe(select(getSelectedUserByUrl))
      .subscribe(user => this.user = user);

  }

  onSaveUser() {
    const user = { ...this.user };

    if (user.id) {
      this.store.dispatch(new UsersActions.UpdateUser(user));
    } else {
      this.store.dispatch(new UsersActions.CreateUser(user));
    }

    // const method = user.id ? 'updateUser' : 'createUser';
    // this.sub = this.userObservableService[method](user).subscribe(
    //   () => {
    //     this.originalUser = { ...this.user };
    //     user.id
    //       ? // optional parameter: http://localhost:4200/users;editedUserID=2
    //         this.router.navigate(['users', { editedUserID: user.id }])
    //       : this.goBack();
    //   },
    //   error => console.log(error)
    // );
  }

  goBack() {
    // this.location.back();
    this.store.dispatch(new RouterActions.Back());
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    // const flags = Object.keys(this.originalUser).map(key => {
    //   if (this.originalUser[key] === this.user[key]) {
    //     return true;
    //   }
    //   return false;
    // });

    // if (flags.every(el => el)) {
    //   return true;
    // }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    // return this.dialogService.confirm('Discard changes?');
    const flags = [];

    return this.store.pipe(
      select(getUsersOriginalUser),
      switchMap(originalUser => {
        for (const key in originalUser) {
          if (originalUser[key] === this.user[key]) {
            flags.push(true);
          } else {
            flags.push(false);
          }
        }

        if (flags.every(el => el)) {
          return of(true);
        }

        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
      })
    );

  }
}
