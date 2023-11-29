import { Tab, Tabs } from "react-bootstrap";
import { useAuth } from "../Contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function Tabss() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Tabs
      defaultActiveKey="dashboard"
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={(k) => {
        if (k === "logout") {
          logout();
          navigate("/");
        }
      }}
    >
      <Tab eventKey="dashboard" title="Dashboard"></Tab>
      <Tab
        eventKey="logout"
        title="Logout"
        onClick={() => {
          logout();
          navigate("/");
        }}
      ></Tab>
    </Tabs>
  );
}

export default Tabss;
