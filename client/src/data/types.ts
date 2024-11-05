export type Entity = Project | TeamMember | Offer | Lead | User;

export type WrapperCardProps = {
  title: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
};

export type Project = {
  id: number;
  title_eng: string;
  description_eng: string;
  title_ua: string;
  description_ua: string;
  social_urls: { [key: string]: string | null };
  cover_id: number;
  screens: number[];
  isShowOnSite: boolean;
  isOnHeroSlider: boolean;
  createdDate: Date;
  editedAtDate: Date;
};

export type TeamMember = {
  id: number;
  name_eng: string;
  name_ua: string;
  jobTitle_eng: string;
  jobTitle_ua: string;
  photo_id: number;
};

export type Offer = {
  id: number;
  title_eng: string;
  description_eng: string;
  description_ua: string;
  title_ua: string;
  cover_id: number;
  createdDate: Date;
  expiredDate: Date;
};

export type Lead = {
  id: number;
  full_name: string;
  email: string;
  phone_number: number;
  company_name: string;
  project_info: string;
  agreement: boolean;
  is_checked: boolean;
  createdAt: Date;
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
