import { Form, Input, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/LoginService";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await login(values);
      toast.success("Login successful!");
      // Handle successful login (e.g., redirect, store token, etc.)
      console.log("Login response:", response);
      navigate("/dashboard"); // Navigate to the dashboard page
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          backgroundImage:
            "url(https://www.avonsolutions.com/wp-content/uploads/2021/08/integrated-courier-final.jpg)",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "300px", width: "100%", padding: "50px" }}>
          <Title level={2}>Login</Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div style={{ marginTop: "1rem" }}>
            <Link to="/register">
              <Button type="link">Don't have an account? Register</Button>
            </Link>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
