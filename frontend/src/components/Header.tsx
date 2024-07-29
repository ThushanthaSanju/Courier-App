import React from "react";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader: React.FC = () => {
  return (
    <Header style={{ background: "#fff", padding: 0 }}>
      <Title level={2} style={{ margin: "12px", color: "#1890ff" }}>
        SpeedyDeliver
      </Title>
    </Header>
  );
};

export default AppHeader;
