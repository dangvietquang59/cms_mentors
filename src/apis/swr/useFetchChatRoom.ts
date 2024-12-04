import queryString from "query-string";
import useSWR from "swr";

import { fetcher } from "./fetcher";
import urls from "../../utils/constants/urls";
import { ChatRoomType } from "../../types/response/chat";

export const useFetchChatRoom = (id: string) => {
  const url = queryString.stringifyUrl({
    url: `${urls.CHAT_GROUP}/${urls.USER}/${id}`,
  });

  const { data, isLoading, error, mutate } = useSWR<ChatRoomType[]>(
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
