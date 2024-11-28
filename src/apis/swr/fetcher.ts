import axiosClient from "../axios/axiosClient";

export const fetcher = (url: string) =>
  axiosClient.get(url).then((res) => res.data);
