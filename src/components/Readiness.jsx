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
        maxWidth: 900,
        margin: '0 auto',
        padding: '0 16px',
      }}
      aria-label="Role Readiness Dashboard"
    >
      <Title level={2}>Role Readiness Dashboard</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card
          bodyStyle={{ padding: 16 }}
          tabIndex={0} // make card focusable for keyboard users
          aria-label="Select an employee to view readiness details"
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Text strong id="employee-select-label">
              Select an Employee:
            </Text>

            {/* Loading Spinner */}
            {loading && (
              <div
                role="status"
                aria-live="polite"
                style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}
              >
                <Spin size="large" />
                <span className="sr-only">Loading employees...</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <Alert
                type="error"
                message="Error loading employees"
                description={error}
                showIcon
                role="alert"
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
                aria-labelledby="employee-select-label"
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {employees.map(emp => (
                  <Option
                    key={emp.id}
                    value={emp.id}
                    aria-label={`${emp.name}, Role: ${emp.role}`}
                  >
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
