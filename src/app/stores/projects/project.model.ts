import { HashMap } from '@datorama/akita';
import { DetailedTodo, Todo } from '@stores/todos';

export interface Status {
  id: string;
  title: string;
}

export interface StatusWithTodos extends Status {
  todos: DetailedTodo[];
}

export interface DetailedStatus extends Status {
  project: Project;
}

export interface Project {
  id: string;
  title: string;
  color: string;
  users: string[];
  statuses: Status[];
  isIncoming?: true;
  isFavorite?: true;
  isShared?: true;
  info?: Record<string, unknown>;
}

export interface CreateProject extends Partial<Project> {
  title: string;
}

export interface ProjectWithTodos extends Project {
  statuses: StatusWithTodos[];
}

export interface ProjectQueryModel extends Omit<Project, 'statuses'> {
  statuses: HashMap<Status>;
}

export interface SelectedProject extends Omit<Project, 'statuses'> {
  status: Status;
}
export interface InboxProject extends Required<Pick<Project, 'isIncoming' | 'color'>> {}

export type SelectedProjectType = SelectedProject | InboxProject;
