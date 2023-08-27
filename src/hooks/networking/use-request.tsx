import { AxiosResponse } from "axios";
import {
  IgnoreError,
  RequestOptions,
} from "../../services/networking/requester";
import { request as requestFunction } from "../../services/networking/requester";
import { HttpException } from "../../services/networking/types/http-exception";
import useError from "../errors/use-error";

export type UseRequestOptions = {
  requestOptions?: RequestOptions;
  handleErrors?: boolean;
  ignoreErrorsOnNotificate?: IgnoreError[];
};

type HandledRequestOptions<T, R> = {
  onSuccess?: (response?: AxiosResponse<T>) => Promise<R>;
  onError?: (error: HttpException) => Promise<R>;
};

export default function useRequest() {
  const { showError } = useError();

  async function request<T>(url: string, options?: UseRequestOptions) {
    try {
      return await requestFunction<T>(url, {
        authToken: options?.requestOptions?.authToken ?? "TOKEN",
        ...options?.requestOptions,
      });
    } catch (e) {
      const error = e as HttpException;

      if (!(options?.handleErrors === false)) {
        for (const ignoreError of options?.ignoreErrorsOnNotificate ?? []) {
          if (
            (!ignoreError.code || ignoreError.code === error.statusCode) &&
            (!ignoreError.section || error.section === ignoreError.section)
          )
            throw e;
        }

        showError(error);
      }
      throw e;
    }
  }

  async function handledRequest<T, R = T | void>(
    url: string,
    options?: UseRequestOptions,
    handledRequestOptions?: HandledRequestOptions<T, R>
  ) {
    try {
      const response = await request<T>(url, {
        ...options,
      });
      return (
        handledRequestOptions?.onSuccess &&
        !!response &&
        (await handledRequestOptions.onSuccess(response))
      );
    } catch (e) {
      return (
        handledRequestOptions?.onError &&
        (await handledRequestOptions.onError(e as HttpException))
      );
    }
  }

  return {
    request,
    handledRequest,
  };
}

export interface PaginatedResponse<T> {
  count: number;
  rows: T[];
}
