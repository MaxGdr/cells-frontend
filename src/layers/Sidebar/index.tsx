import { Menu, Layout } from 'antd'
import { SendOutlined } from '@ant-design/icons'; // Add this line
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* TODO: improve routing method */

const Sidebar = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const { Sider } = Layout;

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['2']}
        items={[
          {
            key: 'home',
            label: 'Predict',
            icon: <SendOutlined />,
            onClick: () => navigate('/'),
          },
          {
            key: '/concept',
            label: 'Datasets',
            onClick: () => navigate('/concept'),
          },
        ]}
      />
    </Sider>
  )
}

export default Sidebar
