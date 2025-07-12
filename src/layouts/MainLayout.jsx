import { useState } from "react";
import { Layout, Menu, Breadcrumb, theme } from "antd";
import {
  Outlet,
  useNavigate,
  useMatches,
  Link,
  useLocation,
} from "react-router-dom";
import {
  HomeOutlined,
  TeamOutlined,
  ReadOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import SuspenseWrapper from "../components/SuspenseWrapper.jsx";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem("Home", "grp1", <HomeOutlined />, [
    getItem("Main", "/", <HomeOutlined />),
    getItem("Dashboard", "/dashboard", <DashboardOutlined />),
  ]),
  getItem("Users", "/users", <TeamOutlined />),
  getItem("Posts", "/posts", <ReadOutlined />),
];

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMatches();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => navigate(e.key);

  const breadcrumbItems = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match, index) => {
      const crumb = match.handle.crumb;
      const crumbText = typeof crumb === "function" ? crumb(match.data) : crumb;
      const isLast = index === matches.length - 1;
      return {
        title: isLast ? (
          crumbText
        ) : (
          <Link to={match.pathname}>{crumbText}</Link>
        ),
      };
    });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: "32px",
            margin: "16px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={["grp1"]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: "0 16px", background: colorBgContainer }}>
          <Breadcrumb items={breadcrumbItems} />
        </Header>
        <Content style={{ margin: "0 16px", paddingTop: "16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 180px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <SuspenseWrapper>
              <Outlet />
            </SuspenseWrapper>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by You
        </Footer>
      </Layout>
    </Layout>
  );
}
