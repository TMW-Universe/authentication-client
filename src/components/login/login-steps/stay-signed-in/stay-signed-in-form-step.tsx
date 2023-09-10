import { Button, Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Translations } from "../../../../i18n/translations.enum";
import { DomainModel } from "../../../../models/domain/domain.model";

const { Title, Text } = Typography;

type Props = {
  setStaySignedIn: (staySignedIn: boolean) => void;
  domain: DomainModel;
};

export default function StaySignedInFormStep({
  domain,
  setStaySignedIn,
}: Props) {
  const { t } = useTranslation([Translations.login]);

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
        <Button block type="primary" onClick={() => setStaySignedIn(true)}>
          {t("form.steps.stay-signed-in.actions.yes.Text")}
        </Button>
      </Col>
    </Row>
  );
}
