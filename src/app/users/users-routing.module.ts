import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  UsersComponent,
  UserListComponent,
  UserFormComponent,
  // UserResolveGuard
} from '.';

import { CanDeactivateGuard } from './../core';
import { UsersStatePreloadingGuard } from './guards/user-state-preloading.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'add',
        component: UserFormComponent
      },
      {
        path: 'edit/:userID',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard],
        // resolve: {
        //   user: UserResolveGuard
        // }
      },
      {
        path: '',
        component: UserListComponent,
        canActivate: [UsersStatePreloadingGuard]
      }
    ]
  }
];

export let usersRouterComponents = [UsersComponent, UserListComponent, UserFormComponent];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard,
    UsersStatePreloadingGuard
  ],

})
export class UsersRoutingModule {}
