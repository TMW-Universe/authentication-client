type Route = (params: never) => string;

export const routes = {
  THIRD_PARTY_AUTHENTICATE: ({ domain }: { domain: string }) =>
    `/third-party/authenticate/v1/${domain}`,
} satisfies Record<string, Route>;
