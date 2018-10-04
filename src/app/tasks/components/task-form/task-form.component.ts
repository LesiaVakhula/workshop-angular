import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as RouterActions from './../../../core/+store/router/router.actions';

import { Store, select } from '@ngrx/store';
import { AppState, getSelectedTaskByUrl } from './../../../core/+store';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';

// rxjs
import { Observable, Subscription } from 'rxjs';

import { Task } from './../../models/task.model';
import { AutoUnsubscribe } from './../../../core';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
@AutoUnsubscribe()
export class TaskFormComponent implements OnInit {
  task: Task;
  // tasksState$: Observable<TasksState>;

  private sub: Subscription;

  constructor(
    private location: Location,
    // private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.task = new Task(null, '', null, null);

    // this.route.paramMap
    //   .pipe(
    //     switchMap((params: Params) => {
    //       return params.get('taskID')
    //         ? this.taskPromiseService.getTask(+params.get('taskID'))
    //         : Promise.resolve(null);
    //     })
    //   )
    //   .subscribe(task => (this.task = { ...task }), err => console.log(err));
    // this.tasksState$ = this.store.pipe(select('tasks'));
    // this.sub = this.tasksState$.subscribe(tasksState =>
    //   this.task = tasksState.selectedTask);
    // this.tasksState$ = this.store.pipe(select('tasks'));
    // this.tasksState$ = this.store.pipe(select(getTasksState));
    // this.sub = this.tasksState$.subscribe(tasksState => {
    //   if (tasksState.selectedTask) {
    //     this.task = tasksState.selectedTask;
    //   } else {
    //     this.task = new Task(null, '', null, null);
    //   }
    // });
    // this.sub = this.store.pipe(select(getSelectedTask))
    //   .subscribe(task => {
    //     if (task) {
    //       this.task = task;
    //     } else {
    //       this.task = new Task(null, '', null, null);
    //     }
    //   });


    // this.route.paramMap.subscribe(params => {
    //   const id = params.get('taskID');
    //   if (id) {
    //     this.store.dispatch(new TasksActions.GetTask(+id));
    //   }
    // });

    // this.sub = this.store
    //   .pipe(select(getSelectedTaskByUrl))
    //   .subscribe(task => this.task = task);
  }

  onSaveTask() {
    const task = { ...this.task };

    // const method = task.id ? 'updateTask' : 'createTask';
    // this.taskPromiseService[method](task)
    //   .then(() => this.goBack())
    //   .catch(err => console.log(err));
    if (task.id) {
      this.store.dispatch(new TasksActions.UpdateTask(task));
    } else {
      this.store.dispatch(new TasksActions.CreateTask(task));
    }

  }

  goBack(): void {
    // this.location.back();
    this.store.dispatch(new RouterActions.Go({
      path: ['/home']
    }));
  }
}
