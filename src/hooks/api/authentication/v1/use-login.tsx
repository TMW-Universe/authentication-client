import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HttpException } from "../../../../networking/errors/http.exception";

type Options = {
  username: string;
  password: string;
};

export function useLogin(domain: string) {
  return useMutation<
    AxiosResponse<ResponseType>,
    AxiosError<HttpException>,
    Options
  >({
    mutationFn: async (options: Options) =>
      await axios.post<ResponseType>(
        `${import.meta.env.VITE_API_HOST}/api/authentication/login`,
        {
          ...options,
          domain,
        }
      ),
    mutationKey: ["authentication", "authenticate", domain],
  });
}

interface ResponseType {
  requires2FA: boolean;
  accessToken: string;
}
