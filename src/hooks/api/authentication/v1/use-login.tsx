import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Options = {
  username: string;
  password: string;
};

export function useLogin(domain: string) {
  return useMutation({
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
