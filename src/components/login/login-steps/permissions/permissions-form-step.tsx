import { Button, Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Translations } from "../../../../i18n/translations.enum";
import { DomainModel } from "../../../../models/domain/domain.model";
import styles from "./permissions-form-step.module.css";

const { Text } = Typography;

type Props = {
  onAccept: () => void;
  domain: DomainModel;
};

export default function PermissionsFormStep({ onAccept, domain }: Props) {
  const { t } = useTranslation([Translations.login]);

  return (
    <Row gutter={[6, 12]}>
      <Col span={24}>
        <Text className={styles.message}>
          {t("form.steps.info.Message") + ""}
          <span className={styles["domain-name"]}>
            {domain.info?.serviceName ?? domain.domain}.
          </span>
        </Text>
      </Col>
      <Col span={24}>
        <Button block onClick={onAccept} type="primary">
          {t("form.steps.info.actions.proceed.Text")}
        </Button>
      </Col>
    </Row>
  );
}
