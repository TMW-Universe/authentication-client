import { useState } from "react";

type Options = {
  domain: string;
};

export function useStoredCredentials({ domain }: Options) {
  const readStoredCredentials = () => {
    const rawCredentials = JSON.parse(
      localStorage.getItem("credentials") ?? "{}"
    ) as StoredCredentials;

    return rawCredentials;
  };

  const [credentials, setCredentialsState] = useState<StoredCredentials>(
    readStoredCredentials()
  );

  const setCredentials = (creds: StoredCredentials) => {
    localStorage.setItem("credentials", JSON.stringify(creds));
    setCredentialsState(creds);
  };

  const addCredential = (domain: string, credential: JwtToken) => {
    // Do not store credentials with no maiching domains
    if (!credential.domains.includes(domain)) return;

    setCredentials({
      ...credentials,
      [domain]: {
        ...(Object.keys(credentials).includes(domain)
          ? credentials[domain]
          : {}),
        [credential.userId]: credential,
      },
    });
  };

  const hasStoredCredentials = Object.keys(credentials).includes(domain)
    ? Object.keys(credentials[domain]).length > 0
    : false;

  const removeCredential = (domain: string, id: string) => {
    const creds = { ...credentials };

    if (
      Object.keys(creds).includes(domain) &&
      Object.keys(creds[domain]).includes(id)
    ) {
      delete creds[domain][id];
      setCredentials(creds);
    }
  };

  return {
    credentials,
    setCredentials,
    readStoredCredentials,
    addCredential,
    removeCredential,
    hasStoredCredentials,
  };
}

type StoredCredentials = { [domain: string]: { [id: string]: JwtToken } };

export interface JwtToken {
  userId: string;
  domains: string[];
  iat: number;
  exp: number;
  iss: string;
  accessToken: string;
}
