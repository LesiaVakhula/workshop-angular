import { Task } from './../../../tasks/models/task.model';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

export interface TasksState extends EntityState<Task> {
  // data: ReadonlyArray<Task>;
  // selectedTask: Readonly<Task>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialTasksState: TasksState = taskAdapter.getInitialState({
  // data: [],
  // selectedTask: null,
  loading: false,
  loaded: false,
  error: null
});
