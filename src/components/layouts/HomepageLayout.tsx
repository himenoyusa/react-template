import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { menuContext } from '@/store/menu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['/', '/a', '/b'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  return {
    key: `/${index || ''}`,
    icon: React.createElement(icon),
    label: `subnav ${index}`,

    // children: new Array(4).fill(null).map((_, j) => {
    //   const subKey = index * 4 + j + 1;
    //   return {
    //     key: subKey,
    //     label: `option${subKey}`,
    //   };
    // }),
  };
});

const App: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { menu, subMenu, dispatch } = useContext(menuContext);
  const setMenu = (key: string) => {
    dispatch({ type: 'setMenu', value: key });
    navigate(key);
  };
  const setSubMenu = (key: string) => {
    dispatch({ type: 'setSubMenu', value: key });
    navigate(key);
  };

  // 刷新进入网页时恢复菜单
  React.useEffect(() => {
    items1.forEach((item) => {
      if (item && pathname.match(item.key as string)) {
        setMenu(item.key as string);
      }
    });
    items2.forEach((item) => {
      if (item && pathname.match(item.key as string)) {
        setSubMenu(item.key as string);
      }
    });
  }, []);

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[menu]} onClick={({ key }) => setMenu(key)} items={items1} />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[subMenu]}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onClick={({ key }) => setSubMenu(key)}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
