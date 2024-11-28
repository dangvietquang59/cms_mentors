import queryString from "query-string";
import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { TransactionsResponseType } from "../../types/response/transactions";

export const useFetchTransactionsByUserId = (id: string) => {
  const url = queryString.stringifyUrl({
    url: `${urls.TRANSACTIONS}/${urls.USER}/${id}`,
  });

  const { data, isLoading, error, mutate } = useSWR<TransactionsResponseType>(
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
