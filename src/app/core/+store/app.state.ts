import { TasksState } from './tasks/tasks.state';
import { UsersState } from './users';

export interface AppState {
  tasks: TasksState;
  users: UsersState;
}
