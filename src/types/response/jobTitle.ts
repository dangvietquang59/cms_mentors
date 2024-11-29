import { JobTitleType } from "../common/jobTitle";

export type JobTitleResponseType = {
  totalJobs: number;
  totalPages: number;
  currentPage: number;
  jobs: JobTitleType[];
};
