import { useState, useEffect } from 'react'
import { Card, List, Avatar, Tag, Typography, Space, Spin } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Text } = Typography

function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const debugVar = 'Debug variable' 

  console.log('EmployeeList rendered')

  useEffect(() => {

    axios.get('http://localhost:8001/employees')
      .then(response => {
        setEmployees(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching employees:', error)
        setLoading(false)
      })
  }, [])

  const renderSkills = (skills) => {
    return skills.map(skill => (
      <Tag color="green" key={skill}>
        {skill}
      </Tag>
    ))
  }

  if (loading) {
    return <Spin size="large" />
  }

  return (
    <div>
      <Title level={2}>Team Members</Title>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
          dataSource={employees}
          renderItem={(employee) => (
            <List.Item>
              <Card
                title={
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Text strong>{employee.name}</Text>
                  </Space>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text type="secondary">{employee.role}</Text>
                  <div>
                    <Text strong>Skills:</Text>
                    <div style={{ marginTop: 8 }}>
                      {renderSkills(employee.skills)}
                    </div>
                  </div>
                </Space>
              </Card>
            </List.Item>
          )}
        />
      </Space>
    </div>
  )
}

export default EmployeeList
