import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TrackShipment from "./pages/TrackShipment";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

const { Content } = Layout;

const App: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!hideHeaderFooter && <AppHeader />}
      <Content>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ship" element={<TrackShipment />} />
        </Routes>
      </Content>
      {!hideHeaderFooter && <AppFooter />}
    </Layout>
  );
};

const AppWrapper: React.FC = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
