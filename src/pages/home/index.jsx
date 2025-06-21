import { Typography } from "antd";

const { Title } = Typography;

export default function PageHome() {
  return (
    <div>
      <Title level={2}>Welcome Home</Title>
      <p>This is the main home page.</p>
    </div>
  );
}
