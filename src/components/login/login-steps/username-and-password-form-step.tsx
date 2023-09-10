import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";
import { Translations } from "../../../i18n/translations.enum";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";

type Props = {
  onSuccessfulCredentials: (props: UsernameAndPasswordFormResult) => void;
};

export default function UsernameAndPasswordFormStep({}: Props) {
  const { t } = useTranslation([Translations.login]);

  const [form] = useForm<UsernameAndPasswordFormModel>();

  return (
    <Form form={form}>
      <FormItem name="username">
        <Input
          placeholder={t(
            "form.steps.username-and-password.fields.username.Label"
          )}
          prefix={<UserOutlined />}
        />
      </FormItem>
      <FormItem name="password">
        <Input.Password
          placeholder={t(
            "form.steps.username-and-password.fields.password.Label"
          )}
          prefix={<KeyOutlined />}
        />
      </FormItem>
      <Button type="primary" htmlType="submit" block>
        {t("form.steps.username-and-password.Submit")}
      </Button>
    </Form>
  );
}

interface UsernameAndPasswordFormModel {}

export type UsernameAndPasswordFormResult =
  | { requires2FA: true; username: string; password: string }
  | { requires2FA: false; accessToken: string };
