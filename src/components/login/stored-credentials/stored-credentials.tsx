import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Typography,
} from "antd";
import { useStoredCredentials } from "../../../hooks/credentials/use-stored-credentials";
import { DeleteOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./stored-credentials.module.css";
import { isBefore } from "date-fns";
import { useTranslation } from "react-i18next";
import { Translations } from "../../../i18n/translations.enum";

const { Title, Text } = Typography;

type Props = {
  domain: string;
  onNewAccount: () => void;
  onSelectCredentials: (options: { accessToken: string }) => void;
};

export default function StoredCredentials({
  domain,
  onNewAccount,
  onSelectCredentials,
}: Props) {
  const { credentials: allCredentials, removeCredential } =
    useStoredCredentials({ domain });

  const { t } = useTranslation([Translations.login]);

  if (!Object.keys(allCredentials).includes(domain)) return null;

  const credentials = allCredentials[domain];

  return (
    <Row gutter={[6, 6]}>
      <Col span={24}>
        <Card
          className={styles["add-account"]}
          hoverable
          onClick={onNewAccount}
        >
          <Space>
            <PlusOutlined />
            <Text>{t("using-stored-account.add-account.Text")}</Text>
          </Space>
        </Card>
        {Object.keys(credentials).length > 0 && (
          <Divider>{t("using-stored-account.Title")}</Divider>
        )}
      </Col>
      {Object.entries(credentials).map(
        ([key, { userId, exp, accessToken }]) => (
          <Col span={24} key={key}>
            <Card
              hoverable
              onClick={() => {
                onSelectCredentials({ accessToken });
              }}
            >
              <div className={styles.credential}>
                <div>
                  <Avatar>
                    <UserOutlined />
                  </Avatar>
                </div>
                <div className={styles.info}>
                  <Title level={4}>{userId}</Title>
                  {isBefore(exp * 1000, Date.now()) && (
                    <Text className={styles["expired-token"]}>
                      {t("using-stored-account.expired.Text")}
                    </Text>
                  )}
                </div>
                <div>
                  <Button
                    icon={<DeleteOutlined />}
                    type="link"
                    danger
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCredential(domain, userId);
                    }}
                  />
                </div>
              </div>
            </Card>
          </Col>
        )
      )}
    </Row>
  );
}
