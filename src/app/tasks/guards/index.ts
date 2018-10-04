import { TaskExistGuard } from './task-exists.guard';
import { TasksStatePreloadingGuard } from './tasks-state-preloading.guard';

export const allGuards: any[] = [TaskExistGuard, TasksStatePreloadingGuard];

export * from './task-exists.guard';
export * from './tasks-state-preloading.guard';
