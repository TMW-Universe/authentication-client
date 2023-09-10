import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Options = {
  username: string;
  password: string;
};

export function useLogin(domain: string) {
  return useMutation({
    mutationFn: async (options: Options) =>
      await axios.post(
        `${import.meta.env.API_HOST}/authentication/authenticate`,
        {
          ...options,
          domain,
        }
      ),
    mutationKey: ["authentication", "authenticate", domain],
  });
}
