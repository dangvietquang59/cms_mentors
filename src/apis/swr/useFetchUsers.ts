import queryString from "query-string";
import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { UserResponseType } from "../../types/response/user";

interface ParamsProps {
  page: number;
}

export const useFetchUsers = (params: ParamsProps) => {
  const url = queryString.stringifyUrl({
    url: `${urls.USERS}/${urls.GET_ALL_USER}`,
    query: params as unknown as queryString.StringifiableRecord,
  });

  const { data, isLoading, error, mutate } = useSWR<UserResponseType>(
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
