import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";
import { Translations } from "../../../i18n/translations.enum";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { useLogin } from "../../../hooks/api/authentication/v1/use-login";
import { AuthCredentialsModel } from "../../../models/auth/auth-credentials.model";
import { DomainModel } from "../../../models/domain/domain.model";

type Props = {
  domain: DomainModel;
  onSuccessfulCredentials: (props: UsernameAndPasswordFormResult) => void;
};

export default function UsernameAndPasswordFormStep({ domain }: Props) {
  const { t } = useTranslation([Translations.login]);

  const [form] = useForm<UsernameAndPasswordFormModel>();

  const { mutateAsync: loginMutation, isLoading: isLoggingIn } = useLogin(
    domain.domain
  );

  const login = async (values: UsernameAndPasswordFormModel) => {
    await loginMutation(values);
  };

  return (
    <Form form={form} onFinish={login}>
      <FormItem name="username" required>
        <Input
          placeholder={t(
            "form.steps.username-and-password.fields.username.Label"
          )}
          prefix={<UserOutlined />}
        />
      </FormItem>
      <FormItem name="password" required>
        <Input.Password
          placeholder={t(
            "form.steps.username-and-password.fields.password.Label"
          )}
          prefix={<KeyOutlined />}
        />
      </FormItem>
      <Button
        type="primary"
        htmlType="submit"
        block
        onClick={() => form.submit}
        loading={isLoggingIn}
      >
        {t("form.steps.username-and-password.Submit")}
      </Button>
    </Form>
  );
}

interface UsernameAndPasswordFormModel {
  username: string;
  password: string;
}

export type UsernameAndPasswordFormResult =
  | { requires2FA: true; credentials: AuthCredentialsModel }
  | { requires2FA: false; accessToken: string };
