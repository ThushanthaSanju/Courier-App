import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { createAccount } from "../services/RegisterService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      await createAccount(values);
      toast.success("Registration successful!");
      toast.info("Redirecting to login page...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "1rem" }}>
      <Title level={2}>Register</Title>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
      <div style={{ marginTop: "1rem" }}>
        <Link to="/">
          <Button type="link">Already have an account? Login</Button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
