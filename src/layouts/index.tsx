import styles from './index.less';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';

const { Header, Content, Footer } = Layout;

function BasicLayout(props: any) {
  return (
    <Layout>
      <Header>
        <div className={styles.logo}>王者荣耀资料库</div>
        <Menu 
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            <Link to="hero">英雄</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="item">局内道具</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="summoner">召唤师技能</Link>
          </Menu.Item>
        </Menu>
      </Header> 
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {props.children}
        </ div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Umi 入门教程 Created by xiaohuoni</Footer>
    </Layout>
  );
}

export default BasicLayout;
