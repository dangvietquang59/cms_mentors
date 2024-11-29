import queryString from "query-string";
import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { TechnologiesResponseType } from "../../types/response/technologies";

interface ParamsProps {
  page: number;
  search: string;
  pageSize: number;
}

export const useFetchTechnologies = (params: ParamsProps) => {
  const url = queryString.stringifyUrl({
    url: `${urls.TECHNOLOGIES}`,
    query: params as unknown as queryString.StringifiableRecord,
  });

  const { data, isLoading, error, mutate } = useSWR<TechnologiesResponseType>(
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
