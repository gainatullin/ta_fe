import { TUser } from 'core/types';

export type TWorkspace = {
  id: number;
  name: string;
  description: string;
  user: TUser;
};

export type TProject = {
  id: number;
  ticket: string;
  name: string;
  description: string;
  workspace: {
    id: number;
    name: string;
    ticket: string;
  };
  creator: TUser;
  lead?: TUser;
  components?: TComponent[];
  avatarSrc?: string;
};

export type TIssue = {
  id: number;
  key: string;
  name: string;
  isBacklog: boolean;
  type: EIssueType;
  description: string;
  createdDate: string;
  updatedDate: string;
  status: EIssueStatus;
  priority: EIssuePriority;
  creator: TUser;
  assignee?: TUser;
  reporter?: TUser;
  component?: TComponent;
  project: TProject;
  estimate: string;
  storyPoints: number;
  files?: [];
  links?: [];
};

export type TComponent = {
  id: number;
  name: string;
  description: string;
  projectId: number;
  lead?: TUser;
};

export type TInvitation = {
  id: number;
  name: string;
  email: string;
  createdDate: string;
};

export type TComment = {
  id: number;
  description: string;
  creator: TUser;
  createdDate: string;
  updateDate: string;
};

export type TShortcut = {
  id: number;
  name: string;
  link: string;
};

export type TDocument = {
  id: number;
  name: string;
  content: string;
};

export type TFilters = {
  name: string;
  users: number[];
  components: number[];
};

export enum EIssueStatus {
  'To Do' = 'todo',
  'In progress' = 'inProgress',
  'Review' = 'review',
  'QA' = 'qa',
  'Done' = 'done',
}

export enum EIssuePriority {
  'Lowest' = 'lowest',
  'Low' = 'low',
  'Medium' = 'medium',
  'High' = 'high',
  'Highest' = 'highest',
}

export enum EIssueType {
  'Task' = 'task',
  'Bug' = 'bug',
}

export enum ELinkType {
  isBLockedBy = 'is blocked by',
  blocks = 'blocks',
  isClonedBy = 'is cloned by',
  clones = 'clones',
  isDuplicatedBy = 'is duplicated by',
  duplicates = 'duplicates',
  relatesTo = 'relates to',
}
