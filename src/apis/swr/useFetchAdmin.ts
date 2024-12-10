import queryString from "query-string";
import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import {
  BookingType,
  RevenueAdmin,
  StatisticTransactionsType,
  StatisticUserType,
} from "../../types/response/statistic";

interface StatisticParamsProps {
  startDate: string;
  endDate: string;
}
export const useFetchStatisticUser = () => {
  const url = queryString.stringifyUrl({
    url: `${urls.STATISTICS}/${urls.USERS}`,
  });

  const { data, isLoading, error, mutate } = useSWR<StatisticUserType>(
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

export const useFetchStatisticTransactions = () => {
  const url = queryString.stringifyUrl({
    url: `${urls.STATISTICS}/${urls.TRANSACTIONS}`,
  });

  const { data, isLoading, error, mutate } = useSWR<StatisticTransactionsType>(
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

export const useFetchStatisticBookings = () => {
  const url = queryString.stringifyUrl({
    url: `${urls.STATISTICS}/${urls.BOOKINGS}`,
  });

  const { data, isLoading, error, mutate } = useSWR<BookingType[]>(
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

export const useFetchStatisticRevenueAndTransactions = (
  params: StatisticParamsProps
) => {
  const url = queryString.stringifyUrl({
    url: `${urls.STATISTICS}/${urls.REVENUE_BY_RANGE_DAY}`,
    query: params as unknown as queryString.StringifiableRecord,
  });

  const { data, isLoading, error, mutate } = useSWR<RevenueAdmin[]>(
    url,
    fetcher
  );
  console.log("🚀 ~ data:", data);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
