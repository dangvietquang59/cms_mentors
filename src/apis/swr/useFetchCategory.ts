import queryString from "query-string";
import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { CategoryResponseType } from "../../types/response/category";

interface ParamsProps {
  page: number;
  search?: string;
  pageSize: number;
}
export const useFetchCategory = (params: ParamsProps) => {
  const url = queryString.stringifyUrl({
    url: `${urls.TAGS}`,
    query: params as unknown as queryString.StringifiableRecord,
  });

  const { data, isLoading, error, mutate } = useSWR<CategoryResponseType>(
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
