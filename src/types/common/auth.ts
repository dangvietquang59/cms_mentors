export type TechnologyType = {
  technology: {
    _id: string;
    name: string;
    __v: 0;
    createdAt: string;
    updatedAt: string;
  };
  experienceYears: number;
  _id: string;
};

export type UserType = {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  imageUrl: string;
  coin: number;
  pricePerHour: number;
  technologies: TechnologyType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: BioType;
  slug: string;
};

export type BioType = {
  _id: string;
  name: string;
  __v: 0;
};
export type LoginResponse = {
  message: string;
  data: UserType;
  accessToken: string;
};
