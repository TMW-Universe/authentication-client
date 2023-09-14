import { useEffect } from "react";
import { OnAuthEnded } from "../../../../types/auth/on-auth-ended.type";
import { Result } from "antd";

type Props = {
  accessToken: string;
  onAuthEnded: OnAuthEnded;
};

export default function DoneFormStep({ accessToken, onAuthEnded }: Props) {
  useEffect(() => {
    setTimeout(() => {
      onAuthEnded({ accessToken });
    }, 1500);
  }, []);

  return <Result status="success" />;
}
