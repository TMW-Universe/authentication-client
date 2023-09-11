import { useParams } from "react-router-dom";
import ThirdPartyAuthenticate from "../../components/login/third-party-authenticate";
import styles from "./third-party-authenticate.page.module.css";

export default function ThirdPartyAuthenticatePage() {
  const { domain } = useParams<{ domain: string }>();

  if (!domain) throw new Error();

  return (
    <div className={styles.container}>
      <ThirdPartyAuthenticate domain={domain} />
    </div>
  );
}
