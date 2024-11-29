import { TechnologiesType } from "../common/technologies";

export type TechnologiesResponseType = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  technologies: TechnologiesType[];
};
