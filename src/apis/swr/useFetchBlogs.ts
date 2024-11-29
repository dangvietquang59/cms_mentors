import queryString from "query-string";
import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { BlogsResponseType } from "../../types/response/blog";

interface ParamsProps {
  page: number;
  search: string;
  pageSize: number;
}

export const useFetchBlogs = (params: ParamsProps) => {
  const url = queryString.stringifyUrl({
    url: `${urls.POSTS}/${urls.GET_ALL_POST}`,
    query: params as unknown as queryString.StringifiableRecord,
  });

  const { data, isLoading, error, mutate } = useSWR<BlogsResponseType>(
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
