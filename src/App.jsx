import { useState } from 'react'
import { Layout, Menu, Typography } from 'antd'
import { TeamOutlined, SearchOutlined, DashboardOutlined } from '@ant-design/icons'
import SkillSearch from './components/SkillSearch'
import EmployeeList from './components/EmployeeList'
import Readiness from './components/Readiness'

const { Header, Content, Sider } = Layout
const { Title } = Typography

function App() {
  const [currentView, setCurrentView] = useState('employees')
  const unusedVariable = 'This is intentionally unused for Task 1' // ⚠️ Linting issue

  console.log('App rendered') // ⚠️ Linting issue

  const menuItems = [
    {
      key: 'employees',
      icon: <TeamOutlined />,
      label: 'Employees',
    },
    {
      key: 'search',
      icon: <SearchOutlined />,
      label: 'Skill Search',
    },
    {
      key: 'readiness',
      icon: <DashboardOutlined />,
      label: 'Role Readiness'    },
  ]

  const renderContent = () => {
    switch (currentView) {
      case 'employees':
        return <EmployeeList />
      case 'search':
        return <SkillSearch />
      case 'readiness':
        return <Readiness />
      default:
        return <EmployeeList />
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 24px' }}>
        <Title level={3} style={{ color: 'white', margin: '16px 0' }}>
          Skills Matrix Dashboard
        </Title>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[currentView]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={({ key }) => setCurrentView(key)}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
