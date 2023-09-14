import { useParams } from "react-router-dom";
import ThirdPartyAuthenticate from "../../components/login/third-party-authenticate";
import styles from "./third-party-authenticate.page.module.css";

export default function ThirdPartyAuthenticatePage() {
  const { domain } = useParams<{ domain: string }>();
  const locationParams = new URLSearchParams(location.search);

  const encKey = locationParams.get("encKey");

  if (!domain || !encKey) throw new Error();

  if (encKey.length < 32) window.close();

  return (
    <div className={styles.container}>
      <ThirdPartyAuthenticate domain={domain} encKey={encKey} />
    </div>
  );
}
