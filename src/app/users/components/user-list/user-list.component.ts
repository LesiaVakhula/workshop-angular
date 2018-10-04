import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as RouterActions from './../../../core/+store/router/router.actions';
import * as UsersActions from './../../../core/+store/users/users.actions';
import { AppState, getUsers, getUsersError, getEditedUser } from './../../../core/+store';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AutoUnsubscribe } from './../../../core/decorators';

import { User } from './../../models/user.model';
import { UserArrayService } from './../../services';


@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

@AutoUnsubscribe('subscription')
export class UserListComponent implements OnInit {
  users$: Observable<Array<User>>;
  usersError$: Observable<Error | string>;
  private subscription: Subscription;


  private editedUser: User;

  constructor(
    // private router: Router,
    private store: Store<AppState>,
  ) { }

  // ngOnInit() {
  //   this.users$ = this.userObservableService.getUsers();

  //   // listen editedUserID from UserFormComponent
  //   this.route.paramMap
  //     .pipe(
  //       switchMap((params: Params) => {
  //         return params.get('editedUserID')
  //           ? this.userObservableService.getUser(+params.get('editedUserID'))
  //           : of(null);
  //       })
  //     )
  //     .subscribe(
  //       (user: User) => {
  //         this.editedUser = {...user};
  //         console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
  //       },
  //       err => console.log(err)
  //     );
  // }
  ngOnInit() {
    this.users$ = this.store.pipe(select(getUsers));
    this.usersError$ = this.store.pipe(select(getUsersError));
    // this.store.dispatch(new UsersActions.GetUsers());

    // listen editedUserID from UserFormComponent
    this.subscription = this.store.pipe(select(getEditedUser))
      .subscribe(
        user => {
          this.editedUser = user;
          console.log(`Last time you edited user ${JSON.stringify(this.editedUser)}`);
        },
        err => console.log(err)
      );
  }

  onEditUser(user: User) {
    const link = ['/users/edit', user.id];
    // this.router.navigate(link);
    this.store.dispatch(new RouterActions.Go({
      path: link
    }));
  }

  isEdited(user: User) {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  onDeleteUser(user: User) {
    // this.users$ = this.userObservableService.deleteUser(user);
    this.store.dispatch(new UsersActions.DeleteUser(user));
  }
}
