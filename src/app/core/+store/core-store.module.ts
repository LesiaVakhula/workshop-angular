import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../../../environments/environment';

import { RouterStateSerializerProvider, routerReducers, RouterEffects } from '.';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers),
    StoreRouterConnectingModule.forRoot(),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([RouterEffects])
  ],
  providers: [
    RouterStateSerializerProvider,
  ],
  declarations: []
})
export class CoreStoreModule { }
