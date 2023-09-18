import { Button, Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Translations } from "../../../../i18n/translations.enum";
import { DomainModel } from "../../../../models/domain/domain.model";
import { useStoredCredentials } from "../../../../hooks/credentials/use-stored-credentials";
import { decodeJwt } from "../../../../utils/jwt/decode-jwt";

const { Title, Text } = Typography;

type Props = {
  setStaySignedIn: (staySignedIn: boolean) => void;
  domain: DomainModel;
  accessToken: string;
};

export default function StaySignedInFormStep({
  domain,
  setStaySignedIn,
  accessToken,
}: Props) {
  const { t } = useTranslation([Translations.login]);

  const { addCredential } = useStoredCredentials({ domain: domain.domain });

  const doStay = () => {
    addCredential(domain.domain, {
      ...decodeJwt(accessToken),
      accessToken,
    });
    setStaySignedIn(true);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Title level={4}>{t("form.steps.stay-signed-in.Title")}</Title>
        <Text>
          {t("form.steps.stay-signed-in.Description", {
            domainName: domain.info?.serviceName ?? domain.domain,
          })}
        </Text>
      </Col>
      <Col span={12}>
        <Button block onClick={() => setStaySignedIn(false)}>
          {t("form.steps.stay-signed-in.actions.no.Text")}
        </Button>
      </Col>
      <Col span={12}>
        <Button block type="primary" onClick={doStay}>
          {t("form.steps.stay-signed-in.actions.yes.Text")}
        </Button>
      </Col>
    </Row>
  );
}
