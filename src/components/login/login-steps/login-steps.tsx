import { useState } from "react";
import { AuthCredentialsModel } from "../../../models/auth/auth-credentials.model";
import UsernameAndPasswordFormStep from "./username-and-password-form-step";
import { DomainModel } from "../../../models/domain/domain.model";
import PermissionsFormStep from "./permissions/permissions-form-step";

type Props = {
  domain: DomainModel;
};

export default function LoginSteps({ domain }: Props) {
  const [hasAcceptedPermissions, setHasAcceptedPermissions] = useState(false);
  const [accessToken, setAccessToken] = useState<string>();
  const [credentials, setCredentials] = useState<
    AuthCredentialsModel & { requires2FA: boolean }
  >();

  if (!hasAcceptedPermissions) {
    return (
      <PermissionsFormStep
        onAccept={() => setHasAcceptedPermissions(true)}
        domain={domain}
      />
    );
  }

  if (credentials?.requires2FA) {
    return <>2FA</>;
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
