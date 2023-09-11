import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { HttpException } from "../../../networking/errors/http.exception";

export function useDomainInfo(domain: string) {
  return useQuery<AxiosResponse<{}>, AxiosResponse<HttpException>>({
    queryFn: async () =>
      await axios.get<{}>(
        `${import.meta.env.VITE_API_HOST}/api/domains/${domain}/info`
      ),
    queryKey: ["domains", domain, "info"],
    retry: false,
  });
}
