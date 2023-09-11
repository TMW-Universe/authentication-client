import { Card, Spin } from "antd";
import StoredCredentials from "./stored-credentials/stored-credentials";
import LoginForm from "./login-form";
import Error from "../error/error";
import { useStoredCredentials } from "../../hooks/credentials/use-stored-credentials";
import { useState } from "react";
import { useDomainInfo } from "../../hooks/api/domains/use-domain-info";
import styles from "./third-party-authenticate.module.css";
import { useTranslation } from "react-i18next";
import { Translations } from "../../i18n/translations.enum";

type Props = {
  domain: string;
};

export default function ThirdPartyAuthenticate({ domain }: Props) {
  const { t } = useTranslation([Translations.login]);

  const { isFetching: isLoadingDomainInfo, status } = useDomainInfo(domain);

  const [wantsNewAccount, setWantsNewAccount] = useState(false);

  const { hasStoredCredentials } = useStoredCredentials();

  if (status === "error")
    return (
      <Error
        title={t("errors.invalid-domain.Title")}
        message={t("errors.invalid-domain.Message", { domain: domain })}
      />
    );

  if (isLoadingDomainInfo)
    return (
      <div className={styles["domain-info-loading-container"]}>
        <Spin />
      </div>
    );

  return (
    <div>
      {wantsNewAccount === false && hasStoredCredentials ? (
        <StoredCredentials
          domain={domain}
          onNewAccount={() => setWantsNewAccount(true)}
        />
      ) : (
        <Card>
          <LoginForm
            domain={{
              domain: domain,
            }}
          />
        </Card>
      )}
    </div>
  );
}
