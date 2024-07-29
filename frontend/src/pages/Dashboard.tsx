import React, { useEffect, useState } from "react";
import { Button, Form, Input, Layout, Menu, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { getUserShipments } from "../services/getUserShipment";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { updateShipment } from "../services/updateShipment";
import { deleteShipment } from "../services/deleteShipment";
import { createShipment } from "../services/createShipment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;

interface Shipment {
  id: number;
  recipientName: string;
  recipientAddress: string;
  shipmentDetails: string;
  status: string;
  trackingNumber: string;
}

const statusLabels: { [key: string]: string } = {
  pending: "Pending",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "pending":
      return "orange";
    case "shipped":
      return "blue";
    case "delivered":
      return "green";
    case "cancelled":
      return "red";
    default:
      return "black";
  }
};
const Dashboard: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
  const [shipId, setShipId] = useState<number>(0);
  const [currentShipment, setCurrentShipment] = useState<Shipment | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );

  const [form] = Form.useForm();

  const fetchShipments = async () => {
    try {
      getUserShipments().then((data: Shipment[]) => {
        setShipments(data);
        toast.success("Shipments fetched successfully!");
      });
    } catch (error) {
      toast.error("Error fetching shipments.");
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const handleEdit = (record: Shipment) => {
    setShipId(record.id);
    form.setFieldsValue({
      id: record.id,
      status: record.status,
      recipientName: record.recipientName,
      recipientAddress: record.recipientAddress,
      shipmentDetails: record.shipmentDetails,
    });
    setCurrentShipment(record);
    setIsModalVisible(true);
  };
  const handleCreate = () => {
    form.resetFields();

    setIsModalVisibleCreate(true);
  };
  const handleSave = async (values: Shipment) => {
    try {
      await updateShipment(shipId, values);
      fetchShipments();
      form.resetFields();
      toast.success("Shipment updated successfully!");
    } catch (error) {
      form.resetFields();
      toast.error("Error updating shipment.");
    } finally {
      setIsModalVisible(false);
      setCurrentShipment(null);
    }
  };
  const handleCreateShipment = async (values: Shipment) => {
    try {
      await createShipment(values);
      fetchShipments();
      form.resetFields();

      toast.success("Shipment Created successfully!");
    } catch (error) {
      form.resetFields();

      toast.error("Error Creating shipment.");
    } finally {
      setIsModalVisibleCreate(false);

      setCurrentShipment(null);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setDeleteModalVisible(false);
    form.resetFields();

    setIsModalVisibleCreate(false);
    setCurrentShipment(null);
  };
  const showDeleteModal = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setDeleteModalVisible(true);
  };
  const handleDelete = async () => {
    try {
      if (selectedShipment) {
        deleteShipment(selectedShipment.id);

        form.resetFields();

        toast.success("Shipment deleted successfully!");
        setDeleteModalVisible(false);
        setSelectedShipment(null);
      }
      fetchShipments();
    } catch (error) {
      toast.error("Error deleting shipment.");
    }
  };

  const columns = [
    {
      title: "Shipment ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Recipient Name",
      dataIndex: "recipientName",
      key: "origin",
    },
    {
      title: "Recipient Address",
      dataIndex: "recipientAddress",
      key: "recipientAddress",
    },
    {
      title: "Shipment Details",
      dataIndex: "shipmentDetails",
      key: "shipmentDetails",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span style={{ color: getStatusColor(status) }}>
          {statusLabels[status] || status}
        </span>
      ),
    },
    {
      title: "Tracking Number",
      dataIndex: "trackingNumber",
      key: "trackingNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Shipment) => (
        <span>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          ></Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteModal(record)}
          ></Button>
        </span>
      ),
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
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
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreate}
            >
              Create Shipment
            </Button>
            <Table dataSource={shipments} columns={columns} rowKey="id" />
            <Modal
              title="Edit Shipment"
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              {currentShipment && (
                <Form
                  initialValues={currentShipment}
                  onFinish={handleSave}
                  layout="vertical"
                  form={form}
                >
                  <Form.Item
                    name="recipientName"
                    label="Recipient Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the recipient name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="recipientAddress"
                    label="Recipient Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input the recipient address!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="shipmentDetails"
                    label="Shipment Details"
                    rules={[
                      {
                        required: true,
                        message: "Please input the shipment details!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                      { required: true, message: "Please select the status!" },
                    ]}
                  >
                    <Select>
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <Select.Option key={value} value={value}>
                          {label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </Form.Item>
                </Form>
              )}
            </Modal>
            <Modal
              title="Delete Shipment"
              visible={deleteModalVisible}
              onOk={handleDelete}
              onCancel={handleCancel}
              okButtonProps={{
                style: { backgroundColor: "red", borderColor: "red" },
              }}
            >
              <p>Are you sure you want to delete this shipment?</p>
            </Modal>
            <Modal
              title="Create Shipment"
              visible={isModalVisibleCreate}
              onCancel={handleCancel}
              footer={null}
            >
              <Form
                form={form}
                onFinish={handleCreateShipment}
                layout="vertical"
              >
                <Form.Item
                  name="recipientName"
                  label="Recipient Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input the recipient name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="recipientAddress"
                  label="Recipient Address"
                  rules={[
                    {
                      required: true,
                      message: "Please input the recipient address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="shipmentDetails"
                  label="Shipment Details"
                  rules={[
                    {
                      required: true,
                      message: "Please input the shipment details!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    { required: true, message: "Please select the status!" },
                  ]}
                >
                  <Select>
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <Select.Option key={value} value={value}>
                        {label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};

export default Dashboard;
