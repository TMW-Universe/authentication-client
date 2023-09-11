import { Col, Divider, Row, Spin, Typography, theme } from "antd";
import tmw_universe_logo from "../../assets/branding/tmw_universe_logo.png";
import styles from "./login-form.module.css";
import { useTranslation } from "react-i18next";
import { Translations } from "../../i18n/translations.enum";
import LoginSteps from "./login-steps/login-steps";
import { DomainModel } from "../../models/domain/domain.model";
import { useDomainInfo } from "../../hooks/api/domains/use-domain-info";
import Error from "../error/error";

const { Title, Link } = Typography;

type Props = {
  domain: DomainModel;
};

export default function LoginForm({ domain }: Props) {
  const { useToken } = theme;
  const { token } = useToken();

  const { t } = useTranslation([Translations.login]);

  const { isFetching: isLoadingDomainInfo, status } = useDomainInfo(
    domain.domain
  );

  const openDomain = () => {
    window.open("https://" + domain, "_blank");
  };

  if (status === "error")
    return (
      <Error
        title={t("errors.invalid-domain.Title")}
        message={t("errors.invalid-domain.Message", { domain: domain.domain })}
      />
    );

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Row gutter={[1, 1]}>
          <Col span={24} className={styles.logo}>
            <img src={tmw_universe_logo} alt="TMW Universe logo" />
          </Col>
          <Col span={24} className={styles["title-container"]}>
            <Title level={4}>{t("form.Title")}</Title>
            <Link onClick={openDomain} style={{ color: token.colorPrimary }}>
              {domain.domain}
            </Link>
          </Col>
        </Row>
        <Divider />
      </Col>
      {isLoadingDomainInfo ? (
        <div className={styles["domain-info-loading-container"]}>
          <Spin />
        </div>
      ) : (
        <Col span={24}>
          <LoginSteps domain={domain} />
        </Col>
      )}
    </Row>
  );
}
