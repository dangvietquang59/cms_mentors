export type CategoryResponseType = {
  totalTags: number;
  totalPages: number;
  currentPage: number;
  tags: CategoryType[];
};

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
