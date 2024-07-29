import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import TrackShip from "./pages/TrackShipment";
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content style={{}}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ship" element={<TrackShip />} />
          </Routes>{" "}
        </Content>
        <AppFooter />
      </Layout>
    </Router>
  );
};

export default App;
