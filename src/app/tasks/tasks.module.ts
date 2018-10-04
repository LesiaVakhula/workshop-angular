import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { StoreModule } from '@ngrx/store';
import { tasksReducer, TasksEffects } from './../core/+store';

import {
  TaskComponent,
  TaskFormComponent,
  TaskListComponent,
  TaskPromiseService
} from '.';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule,
    StoreModule.forFeature('tasks', tasksReducer),
    EffectsModule.forFeature([TasksEffects])
  ],
  providers: [TaskPromiseService]
})
export class TasksModule {}
