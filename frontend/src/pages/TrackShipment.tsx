import React, { useState } from "react";
import { Button, Form, Input, Layout, Menu, Modal, Typography } from "antd";
import { Link } from "react-router-dom";
import { trackShipment } from "../services/trackShip";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  UserOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;

const AdminDashboard: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shipmentDetails, setShipmentDetails] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      const details = await trackShipment(values.shipmentId);
      setShipmentDetails(details?.shipment);
      showModal();
    } catch (error) {
      console.error("Error tracking shipment:", error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["3"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1" style={{ marginTop: "30px" }}>
              <UserOutlined />
              <Link to="/dashboard" style={{ marginLeft: "8px" }}>
                User Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item key="2" style={{ marginTop: "10px" }}>
              <DashboardOutlined />
              <Link to="/admin-dashboard" style={{ marginLeft: "8px" }}>
                Admin Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item key="3" style={{ marginTop: "10px" }}>
              <ClockCircleOutlined />
              <Link to="/ship" style={{ marginLeft: "8px" }}>
                Track Shipment
              </Link>
            </Menu.Item>
            <Menu.Item key="4" style={{ marginTop: "10px" }}>
              <LogoutOutlined />
              <Link to="/" style={{ marginLeft: "8px" }}>
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Form layout="inline" onFinish={onFinish}>
              <Form.Item
                name="shipmentId"
                rules={[
                  { required: true, message: "Please input the shipment ID!" },
                ]}
              >
                <Input placeholder="Enter Shipment ID" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Track
                </Button>
              </Form.Item>
            </Form>
            <Modal
              title="Shipment Details"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              {shipmentDetails && (
                <>
                  <Typography>
                    <b>Status:</b> {shipmentDetails.status}
                  </Typography>
                  <Typography>
                    <b>Recipient Name:</b> {shipmentDetails.recipientName}
                  </Typography>
                  <Typography>
                    <b>Recipient Address:</b> {shipmentDetails.recipientAddress}
                  </Typography>
                  <Typography>
                    <b>Shipment Details:</b> {shipmentDetails.shipmentDetails}
                  </Typography>
                </>
              )}
            </Modal>
          </Content>
        </Layout>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};

export default AdminDashboard;
