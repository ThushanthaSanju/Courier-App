import React from "react";
import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: "center", background: "#fff", padding: 0 }}>
      <Text style={{ textAlign: "center", color: "#000000", padding: 0 }}>
        ©2023 SpeedyDeliver. All Rights Reserved.
      </Text>
    </Footer>
  );
};

export default AppFooter;
