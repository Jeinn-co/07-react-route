import { useState } from 'react';
import { Layout, Menu, Breadcrumb, theme } from 'antd';
import { Outlet, useNavigate, useMatches, Link } from 'react-router-dom';
import { HomeOutlined, ReadOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Home', '/', <HomeOutlined />),
  getItem('Editorial', '/editorial/articles', <ReadOutlined />),
];

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const matches = useMatches();
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  const breadcrumbItems = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => {
      const crumb = match.handle.crumb;
      const crumbText = typeof crumb === 'function' ? crumb(match.data) : crumb;
      return {
        title: <Link to={match.pathname}>{crumbText}</Link>,
      };
    });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)' }}/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: '16px'
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by You
        </Footer>
      </Layout>
    </Layout>
  );
} 