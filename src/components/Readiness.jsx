import { Card, Select, Typography, Space, Spin, Alert } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEmployees } from '../hooks/useEmployees'

const { Title, Text } = Typography
const { Option } = Select

function Readiness() {
  const navigate = useNavigate()
  const { employees, loading, error } = useEmployees()

  return (
    <div>
      <Title level={2}>Role Readiness Dashboard</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong>Select an Employee:</Text>

            {loading && <Spin />}
            {error && <Alert type="error" message={error} />}

            {!loading && !error && (
              <Select
                style={{ width: '100%' }}
                placeholder="Choose an employee"
                onChange={(employeeId) =>
                  navigate(`/employees/${employeeId}`)
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
