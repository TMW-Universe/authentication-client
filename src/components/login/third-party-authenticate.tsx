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
import { AES } from "crypto-js";
import { OnAuthEnded } from "../../types/auth/on-auth-ended.type";
import { HTTP_PROTOCOL } from "../../constants/http/http-protocol.constant";

type Props = {
  domain: string;
  encKey: string;
};

export default function ThirdPartyAuthenticate({ domain, encKey }: Props) {
  const { t } = useTranslation([Translations.login]);

  const { isFetching: isLoadingDomainInfo, status } = useDomainInfo(domain);
  const [wantsNewAccount, setWantsNewAccount] = useState(false);
  const { hasStoredCredentials } = useStoredCredentials();

  const stringToHex = (str: string) => {
    let hex = "";
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const hexValue = charCode.toString(16);
      hex += hexValue.padStart(2, "0");
    }
    return hex;
  };

  const onAuthEnded: OnAuthEnded = ({ accessToken }) => {
    const url = `${HTTP_PROTOCOL}://${domain}/_authentication/third-party-authenticate/v1`;
    window.location.href =
      url +
      "?accessToken=" +
      stringToHex(AES.encrypt(accessToken, encKey).toString());
  };

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
            onAuthEnded={onAuthEnded}
          />
        </Card>
      )}
    </div>
  );
}
