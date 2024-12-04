import queryString from "query-string";
import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { MessageType } from "../../types/response/message";

export const useFetchMessages = (id: string) => {
  const url = queryString.stringifyUrl({
    url: `${urls.MESSAGES}/${urls.GROUP}/${id}`,
  });

  const { data, isLoading, error, mutate } = useSWR<MessageType[]>(
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
