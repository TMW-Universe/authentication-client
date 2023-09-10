import { ClockCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";
import { Translations } from "../../../../i18n/translations.enum";
import { AuthCredentialsModel } from "../../../../models/auth/auth-credentials.model";

const { Text } = Typography;

type Props = {
  credentials: AuthCredentialsModel;
  setAccessToken: (accessToken: string) => void;
};

export default function TwoFAFormStep({ setAccessToken }: Props) {
  const { t } = useTranslation([Translations.login]);

  const [form] = useForm<TwoFAFormModel>();

  return (
    <Row gutter={[6, 24]}>
      <Col span={24}>
        <Text>{t("form.steps.two-fa.Message")}</Text>
      </Col>
      <Col span={24}>
        <Form form={form}>
          <FormItem name="code" required>
            <Input
              placeholder={t("form.steps.two-fa.fields.code.Label")}
              maxLength={6}
              minLength={6}
              prefix={<ClockCircleOutlined />}
            />
          </FormItem>
          <Button
            block
            type="primary"
            onClick={() => {
              //DEBUG
              setAccessToken("hola");
            }}
          >
            {t("form.steps.two-fa.Submit")}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

interface TwoFAFormModel {
  code: string;
}
