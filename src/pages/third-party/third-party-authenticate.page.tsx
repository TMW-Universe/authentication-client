import { Card } from "antd";
import { LoginForm } from "../../components/login/login-form";
import styles from "./third-party-authenticate.page.module.css";

export default function ThirdPartyAuthenticate() {
  return (
    <div className={styles.container}>
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
}
