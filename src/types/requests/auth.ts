export type LoginRequestType = {
  email: string;
  password: string;
};

export type RegisterRequestType = {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  imageUrl: string;
  coin: number;
  pricePerHour: number;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: string;
  slug: string;
  authenRole: string;
  confirmed: boolean;
  blocked: boolean;
};
