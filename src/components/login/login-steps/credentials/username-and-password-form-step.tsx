import { Alert, Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";
import { Translations } from "../../../../i18n/translations.enum";
import {
  ClockCircleOutlined,
  KeyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLogin } from "../../../../hooks/api/authentication/v1/use-login";
import { AuthCredentialsModel } from "../../../../models/auth/auth-credentials.model";
import { DomainModel } from "../../../../models/domain/domain.model";
import { HttpExceptionSections } from "../../../../networking/errors/http-exception-sections.enum";

type Props = {
  domain: DomainModel;
  onSuccessfulCredentials: (props: UsernameAndPasswordFormResult) => void;
};

export default function UsernameAndPasswordFormStep({
  domain,
  onSuccessfulCredentials,
}: Props) {
  const { t } = useTranslation([Translations.login]);

  const [form] = useForm<UsernameAndPasswordFormModel>();

  const {
    mutateAsync: loginMutation,
    isLoading: isLoggingIn,
    error,
  } = useLogin(domain.domain);

  const login = async (values: UsernameAndPasswordFormModel) => {
    if (!values.password || !values.username) return;
    try {
      const res = await loginMutation(values);
      if (res.data.accessToken)
        onSuccessfulCredentials({
          requires2FA: false,
          accessToken: res.data.accessToken,
        });
      else if (res.data.requires2FA)
        onSuccessfulCredentials({
          requires2FA: true,
          credentials: values,
        });
      else throw new Error();
    } catch (e) {}
  };

  const wrongCredentials =
    error?.response?.status == 401 &&
    error?.response.data.section === HttpExceptionSections.AUTH;
  const tooManyAttempts = error?.response?.status === 429;

  return (
    <Form form={form} onFinish={login}>
      <FormItem
        name="username"
        required
        validateStatus={wrongCredentials ? "error" : undefined}
      >
        <Input
          placeholder={t(
            "form.steps.username-and-password.fields.username.Label"
          )}
          prefix={<UserOutlined />}
          maxLength={16}
        />
      </FormItem>
      <FormItem
        name="password"
        required
        validateStatus={wrongCredentials ? "error" : undefined}
      >
        <Input.Password
          placeholder={t(
            "form.steps.username-and-password.fields.password.Label"
          )}
          prefix={<KeyOutlined />}
          maxLength={128}
        />
      </FormItem>

      {wrongCredentials && (
        <FormItem>
          <Alert
            showIcon
            type="error"
            message={t("errors.wrong-credentials.Message")}
          />
        </FormItem>
      )}
      {tooManyAttempts && (
        <FormItem>
          <Alert
            showIcon
            icon={<ClockCircleOutlined />}
            type="error"
            message={t("errors.too-many-attempts.Message")}
          />
        </FormItem>
      )}
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
