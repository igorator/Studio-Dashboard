export type Project = {
  id: string;
  url: URL;
  title: string;
  description: string;
  cover: string;
  sreens: string[];
  createdDate: Date;
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
