import { useState } from "react";
import { AuthCredentialsModel } from "../../../models/auth/auth-credentials.model";
import UsernameAndPasswordFormStep from "./credentials/username-and-password-form-step";
import { DomainModel } from "../../../models/domain/domain.model";
import TwoFAFormStep from "./two-fa/two-fa-form-step";
import StaySignedInFormStep from "./stay-signed-in/stay-signed-in-form-step";
import DoneFormStep from "./done/done-form-step";
import { OnAuthEnded } from "../../../types/auth/on-auth-ended.type";

type Props = {
  domain: DomainModel;
  onAuthEnded: OnAuthEnded;
};

export default function LoginSteps({ domain, onAuthEnded }: Props) {
  const [accessToken, setAccessToken] = useState<string>();
  const [credentials, setCredentials] = useState<
    AuthCredentialsModel & { requires2FA: boolean }
  >();
  const [staySignedIn, setStaySignedIn] = useState<boolean>();

  if (credentials?.requires2FA && !accessToken) {
    return (
      <TwoFAFormStep
        setAccessToken={setAccessToken}
        credentials={credentials}
      />
    );
  }

  if (accessToken && staySignedIn === undefined) {
    return (
      <StaySignedInFormStep
        accessToken={accessToken}
        domain={domain}
        setStaySignedIn={setStaySignedIn}
      />
    );
  }

  if (accessToken && staySignedIn !== undefined) {
    return <DoneFormStep accessToken={accessToken} onAuthEnded={onAuthEnded} />;
  }

  return (
    <UsernameAndPasswordFormStep
      onSuccessfulCredentials={(result) => {
        if (result.requires2FA)
          setCredentials({ ...result.credentials, requires2FA: true });
        else setAccessToken(result.accessToken);
      }}
      domain={domain}
    />
  );
}
