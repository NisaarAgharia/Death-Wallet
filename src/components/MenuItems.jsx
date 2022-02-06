import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { Card, Timeline, Typography } from "antd";

function MenuItems() {
  const { pathname } = useLocation();
  const { Text } = Typography;
  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/contract">
        <NavLink to="/contract">
          Secure Cypto Assests</NavLink>
      </Menu.Item>
      <Menu.Item key="/wallet">
        <NavLink to="/wallet">
          Transfer to Nominee</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
