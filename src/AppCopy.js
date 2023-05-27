import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu } from 'antd';
import React, { useState } from 'react';

const { Header, Sider, Content, Footer } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = () => {
    console.log('request');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const onMenuClick = e => {
    console.log(e);
  };

  const menu = (
    <Menu
      onClick={onMenuClick}
      items={[
        {
          key: '1',
          label: '1st item'
        },
        {
          key: '2',
          label: '2nd item'
        },
        {
          key: '3',
          label: '3rd item'
        }
      ]}
    />
  );

  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1'
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2'
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3'
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0
          }}
        >
          {React.createElement(
            collapsed
              ? MenuUnfoldOutlined
              : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24
          }}
        >
          <>
            <header>Button</header>
            <h1>type属性</h1>
            <div>
              <Button type="default">默认按钮</Button>
              &nbsp;
              <Button type="primary">primary按钮</Button>
              &nbsp;
              <Button type="ghost">
                ghost按钮（背景色为透明的）
              </Button>
              &nbsp;
              <Button type="dashed">dashed按钮</Button>
              &nbsp;
              <Button type="text">text按钮</Button>
              &nbsp;
              <Button type="link">link按钮</Button>
            </div>
            <br />
            <br />
            <h1>size属性</h1>
            <div>
              <Button type="primary">default按钮</Button>
              &nbsp;
              <Button type="primary" size="small">
                small按钮
              </Button>
              &nbsp;
              <Button type="primary" size="middle">
                middle按钮
              </Button>
              &nbsp;
              <Button type="primary" size="large">
                large按钮
              </Button>
              &nbsp;
            </div>
            <br />
            <br />
            <h1>shape属性</h1>
            <div>
              <Button type="primary">default按钮</Button>
              &nbsp;
              <Button type="primary" shape="round">
                round按钮
              </Button>
              &nbsp;
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
              />
              circle按钮
            </div>
            <br />
            <br />
            <h1>loading属性</h1>
            <div>
              <Button type="primary" loading={isLoading}>
                loading按钮
              </Button>
              &nbsp;
              <Button
                type="primary"
                onClick={handleRequest}
                shape="round"
              >
                模拟请求
              </Button>
            </div>
            <br />
            <br />
            <h1>block属性</h1>
            <div>
              <div
                style={{
                  width: '200px'
                }}
              >
                <Button type="primary" block>
                  200witdh
                </Button>
              </div>
              <br />
              <div
                style={{
                  width: '400px'
                }}
              >
                <Button type="primary" block>
                  400witdh
                </Button>
              </div>
            </div>
            <br />
            <br />
            <h1>disabled属性</h1>
            <div>
              <Button type="primary" disabled>
                disabled为true
              </Button>
              &nbsp;
              <Button type="primary" disabled={false}>
                disabled为false
              </Button>
            </div>
            <br />
            <br />
            <h1>danger属性</h1>
            <div>
              <Button type="primary" danger>
                danger+parimary按钮
              </Button>
              &nbsp;
              <Button danger type="dashed">
                danger+dash按钮
              </Button>
              &nbsp;
              <Button danger type="round">
                danger+dash按钮
              </Button>
            </div>
            <br />
            <br />
            <h1>Dropdown.Button</h1>
            <div>
              <Dropdown.Button overlay={menu}>
                Dropdown.Button.Actions
              </Dropdown.Button>
            </div>
          </>
        </Content>
        <Footer
          style={{
            textAlign: 'center'
          }}
        >
          Ant Design Test ©2022 Created by Cstylefly
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
