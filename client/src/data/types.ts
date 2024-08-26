export type Project = {
  id: string;
  url: string;
  title: string;
  description: string;
  cover: string;
  screens: string[];
  createdDate: Date;
  editedAtDate: Date;
};

export type ProjectState = {
  project: Project | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

export type TeamMember = {
  id: string;
  name: string;
  jobTitle: string;
  photo: string;
};

export type Offer = {
  id: string;
  title: string;
  description: string;
  animation: string;
  createdDate: Date;
  expiredDate: Date;
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: number;
  company: string;
  message: string;
  agreement: boolean;
};

export type User = {
  id: string;
  name: string;
};

export enum LoadingState {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}
