import { useState, useEffect } from 'react'
import { Card, List, Avatar, Tag, Typography, Space, Spin } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Text } = Typography

function EmployeeList({ searchTerm }) {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get(
        'https://fantastic-fortnight-7r95qxrxg736qw-8001.app.github.dev/employees'
      )
      .then(response => {
        const filtered = searchTerm
          ? response.data.filter(emp =>
              emp.skills.some(skill =>
                skill.toLowerCase().includes(searchTerm.toLowerCase())
              )
            )
          : response.data

        setEmployees(filtered)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching employees:', error)
        setLoading(false)
      })
  }, [searchTerm])

  const renderSkills = employee => (
    <Space size={[4, 8]} wrap>
      {employee.skills.map(skill => (
        <Tag color="green" key={`${employee.id}-${skill}`}>
          {skill}
        </Tag>
      ))}
    </Space>
  )

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
      <Title level={2}>Team Members</Title>

      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          dataSource={employees}
          locale={{ emptyText: 'No employees match your search' }}
          renderItem={employee => (
            <List.Item>
              <Card
                bodyStyle={{ padding: 16 }}
                title={
                  <Space wrap>
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
                      {renderSkills(employee)}
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
