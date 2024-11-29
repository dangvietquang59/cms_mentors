import queryString from "query-string";
import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { JobTitleResponseType } from "../../types/response/jobTitle";

interface ParamsProps {
  page: number;
  search: string;
  pageSize: number;
}

export const useFetchJobtitle = (params: ParamsProps) => {
  const url = queryString.stringifyUrl({
    url: `${urls.JOBTITLE}`,
    query: params as unknown as queryString.StringifiableRecord,
  });

  const { data, isLoading, error, mutate } = useSWR<JobTitleResponseType>(
    url,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
