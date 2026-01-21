import { Card, Select, Typography, Space, Spin, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEmployees } from '../hooks/useEmployees'

const { Title, Text } = Typography
const { Option } = Select

function Readiness() {
  const navigate = useNavigate()
  const { employees, loading, error } = useEmployees()

  return (
    <div
      style={{
        maxWidth: 900,       // keeps content readable on large screens
        margin: '0 auto',
        padding: '0 16px',   // padding for mobile
      }}
    >
      <Title level={2}>Role Readiness Dashboard</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card bodyStyle={{ padding: 16 }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Text strong>Select an Employee:</Text>

            {/* Loading Spinner */}
            {loading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '8px 0',
                }}
              >
                <Spin size="large" />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <Alert
                type="error"
                message="Error loading employees"
                description={error}
                showIcon
              />
            )}

            {/* Employee Select */}
            {!loading && !error && (
              <Select
                style={{ width: '100%' }}
                size="large"
                placeholder="Choose an employee"
                onChange={employeeId => navigate(`/employees/${employeeId}`)}
                optionFilterProp="children"
                showSearch
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {employees.map(emp => (
                  <Option key={emp.id} value={emp.id}>
                    {emp.name} – {emp.role}
                  </Option>
                ))}
              </Select>
            )}
          </Space>
        </Card>
      </Space>
    </div>
  )
}

export default Readiness
