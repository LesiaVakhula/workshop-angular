import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';


import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule, usersRouterComponents } from './users-routing.module';

import { UserComponent, UserArrayService, UserObservableService } from '.';
import { UsersAPIProvider } from './users.config';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects, usersReducer } from './../core/+store';
// import { UsersEffects } from '../core/+store/users/users.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UsersRoutingModule,
    // EffectsModule.forFeature([UsersEffects])
    StoreModule.forFeature('users', usersReducer),
  ],
  declarations: [
    usersRouterComponents,
    UserComponent,
  ],
  providers: [
    UserArrayService,
    UserObservableService,
    UsersAPIProvider,
    // UserResolveGuard
  ]
})
export class UsersModule {}
