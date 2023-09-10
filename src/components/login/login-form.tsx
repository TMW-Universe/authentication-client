import { Col, Row, Typography } from "antd";
import UsernameAndPasswordFormStep from "./login-steps/username-and-password-form-step";
import tmw_universe_logo from "../../assets/branding/tmw_universe_logo.png";
import styles from "./login-form.module.css";
import { useTranslation } from "react-i18next";
import { Translations } from "../../i18n/translations.enum";

const { Title } = Typography;

type Props = {
  domain: string;
};

export default function LoginForm({ domain }: Props) {
  const { t } = useTranslation([Translations.login]);

  return (
    <Row gutter={[12, 48]}>
      <Col span={24}>
        <Row gutter={[1, 1]}>
          <Col span={24} className={styles.logo}>
            <img src={tmw_universe_logo} alt="TMW Universe logo" />
          </Col>
          <Col span={24}>
            <Title level={4} className={styles.title}>
              {t("form.Title")}
            </Title>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <UsernameAndPasswordFormStep
          onSuccessfulCredentials={() => {}}
          domain={domain}
        />
      </Col>
    </Row>
  );
}
