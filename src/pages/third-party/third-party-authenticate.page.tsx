import { Card } from "antd";
import styles from "./third-party-authenticate.page.module.css";
import LoginForm from "../../components/login/login-form";
import { useParams } from "react-router-dom";

export default function ThirdPartyAuthenticate() {
  const { domain } = useParams<{ domain: string }>();

  if (!domain) throw new Error();

  return (
    <div className={styles.container}>
      <Card>
        <LoginForm
          domain={{
            domain: domain,
          }}
        />
      </Card>
    </div>
  );
}
