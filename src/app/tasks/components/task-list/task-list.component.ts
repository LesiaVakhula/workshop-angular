import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import * as RouterActions from './../../../core/+store/router/router.actions';

import { Task } from './../../models/task.model';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, getTasksData, getTasksError } from './../../../core/+store';
import { Observable } from 'rxjs';


@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  // tasksState$: Observable<TasksState>;
  tasks$: Observable<ReadonlyArray<Task>>;
  tasksError$: Observable<Error | string>;

  constructor(
    // private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    console.log('We have a store! ', this.store);
    // this.tasksState$ = this.store.pipe(select('tasks'));
    // this.tasksState$ = this.store.pipe(select(getTasksState));
    this.tasks$ = this.store.pipe(select(getTasksData));
    this.tasksError$ = this.store.pipe(select(getTasksError));

    // this.store.dispatch(new TasksActions.GetTasks());
  }

  onCreateTask() {
    // const link = ['/add'];
    // this.router.navigate(link);
    this.store.dispatch(new RouterActions.Go({
      path: ['/add']
    }));
  }

  onCompleteTask(task: Task): void {
    // this.store.dispatch(new TasksActions.DoneTask(task));
    const doneTask = { ...task, done: true };
    this.store.dispatch(new TasksActions.UpdateTask(doneTask));

  }

  onEditTask(task: Task): void {
    const link = ['/edit', task.id];
    // this.router.navigate(link);
    this.store.dispatch(new RouterActions.Go({
      path: link
    }));
  }

  onDeleteTask(task: Task) {
    this.store.dispatch(new TasksActions.DeleteTask(task));
  }

}
