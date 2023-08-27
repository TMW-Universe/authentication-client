export default {
  api: {
    host: import.meta.env.VITE_API_HOST as string,
    port:
      typeof import.meta.env.VITE_API_PORT === "string"
        ? +import.meta.env.VITE_API_PORT
        : 5001,
  },
  msal: {
    loginConfig: {
      redirectUri: import.meta.env.BASE_URL,
    },
  },
};
