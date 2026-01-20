import { useState } from 'react'
import { Card, Select, Typography, Space, Spin, Alert } from 'antd'
import { useEmployees } from '../hooks/useEmployees'
import { useReadiness } from '../hooks/useReadiness'

const { Title, Text } = Typography
const { Option } = Select

function Readiness() {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const { employees, loading: employeesLoading, error: employeesError } = useEmployees()
  const { data, loading: readinessLoading, error: readinessError } = useReadiness(selectedEmployee)

  return (
    <div>
      <Title level={2}>Role Readiness Dashboard</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong>Select an Employee:</Text>

            {employeesLoading && <Spin />}
            {employeesError && <Alert type="error" message={employeesError} />}

            {!employeesLoading && !employeesError && (
              <Select
                style={{ width: '100%' }}
                placeholder="Choose an employee"
                value={selectedEmployee}
                onChange={setSelectedEmployee}
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

        {readinessLoading && <Spin size="large" />}
        {readinessError && <Alert type="error" message={readinessError} />}

        {data && !readinessLoading && (
          <Alert
            type="info"
            showIcon
            message="Role Readiness"
            description={`Employee: ${data.employeeName}
Target Role: ${data.targetRole}`}
          />
        )}
      </Space>
    </div>
  )
}

export default Readiness
