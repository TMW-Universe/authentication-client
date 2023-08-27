import axios, { AxiosError, AxiosRequestConfig, ResponseType } from "axios";
import { ExceptionSection } from "./types/http-exception";
import { RequestHeader } from "./types/request-header";
import { RequestMethod } from "./types/request-method";
import { RequestProtocol } from "./types/request-protocol";
import constants from "../../config/constants";

export type RequestOptions = {
  apiRoute?: string;
  host?: string;
  protocol?: RequestProtocol;
  port?: number;
  method?: RequestMethod;
  payload?: object;
  headers?: RequestHeader[];
  authToken?: string;
  rawUrl?: boolean;
  ignoreErrors?: IgnoreError[];

  // Querying
  pagination?: RequestPagination;
  sort?: RequestSort;
  query?: object;

  // Files
  files?: File[];
  filesFormFieldName?: string;

  // Generic
  responseType?: ResponseType;
};

export class RequestPagination {
  offset?: number;
  limit?: number;
}

export enum SortModes {
  ascend = "ASC",
  descend = "DESC",
}

export type RequestSort = [string, SortModes][];

export type IgnoreError = { section?: ExceptionSection; code?: number };

export async function request<T>(
  route: string,
  requestOptions?: RequestOptions
) {
  const options = requestOptions ?? {};

  const protocol = options.protocol ?? RequestProtocol.http;
  const host = options.host ?? constants.api.host;
  const port = options.port ?? constants.api.port;

  const url = options.rawUrl
    ? route
    : `${protocol}://${host}:${port}/api${
        options.apiRoute ? `/${options.apiRoute}` : ""
      }/${route}`;

  const headers: Record<string, string> = {};

  // Access-Control-Allow-Origin
  headers["Access-Control-Allow-Origin"] = "*";

  // Format headers
  for (const header of options.headers ?? []) {
    headers[header.header] = `${header.value}`;
  }

  // Set auth header
  if (options.authToken)
    headers["Authorization"] = "Bearer " + options.authToken;

  // Form data
  const formData = options.files ? new FormData() : undefined;

  // Files processing
  if (options.files && formData) {
    for (const file of options.files)
      formData.append(options.filesFormFieldName ?? "files", file);
  }
  if (
    options.files &&
    options.payload &&
    options.filesFormFieldName !== "body" &&
    formData
  ) {
    formData.append("body", JSON.stringify(options.payload));
  }

  // Create axios config
  const axiosConfig: AxiosRequestConfig = {
    url,
    method: options.method ?? RequestMethod.get,
    params: {
      ...options.pagination,
      ...options.query,
      orderBy: options.sort,
    },
    data: formData ?? options.payload,
    headers: {
      ...headers,
    },
    responseType: options.responseType,
  };

  try {
    // Send request
    const result = await axios.request<T>(axiosConfig);
    return result;
  } catch (e: unknown) {
    const error = e as AxiosError<{
      statusCode: number;
      section: ExceptionSection;
    }>;

    const status = error.response?.status;

    if (status && options.ignoreErrors) {
      for (const ignoreError of options.ignoreErrors) {
        if (
          (!ignoreError.code ||
            ignoreError.code === error.response?.data.statusCode) &&
          (!ignoreError.section ||
            error.response?.data.section === ignoreError.section)
        )
          return undefined;
      }
    }

    throw error.response?.data;
  }
}
