import { Result } from "antd";

type Props = {
  title: string;
  message: string;
};

export default function Error({ title, message }: Props) {
  return <Result title={title} status="error" subTitle={message}></Result>;
}
