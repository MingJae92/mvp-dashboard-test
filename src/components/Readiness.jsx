import { useState, useEffect } from 'react'
import { Card, Select, Typography, Space, Spin, Alert } from 'antd'
import axios from 'axios'

const { Title, Text } = Typography
const { Option } = Select

function Readiness() {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [readinessData, setReadinessData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch employees for the dropdown
    axios
      .get('https://fantastic-fortnight-7r95qxrxg736qw-8001.app.github.dev/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error))
  }, [])

  const handleEmployeeSelect = employeeId => {
    setSelectedEmployee(employeeId)
    setLoading(true)

    // Fetch readiness data for selected employee
    axios
      .get(`https://fantastic-fortnight-7r95qxrxg736qw-8001.app.github.dev/readiness?employeeId=${employeeId}`)
      .then(response => {
        setReadinessData(response.data[0])
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching readiness:', error)
        setLoading(false)
      })
  }

  return (
    <div>
      <Title level={2}>Role Readiness Dashboard</Title>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Card>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong>Select an Employee:</Text>
            <Select
              style={{ width: '100%' }}
              placeholder="Choose an employee to view their role readiness"
              onChange={handleEmployeeSelect}
              value={selectedEmployee}
            >
              {employees.map(emp => (
                <Option key={emp.id} value={emp.id}>
                  {emp.name} - {emp.role}
                </Option>
              ))}
            </Select>
          </Space>
        </Card>

        {loading && <Spin size="large" />}

        {readinessData && !loading && (
          <Alert
            message="TODO: Implement Readiness Visualization"
            description={`This component should display readiness data for ${readinessData.employeeName}. 
            Target Role: ${readinessData.targetRole}. 
            Implement visual indicators, skill gaps, and expertise levels here.`}
            type="info"
            showIcon
          />
        )}
      </Space>
    </div>
  )
}

export default Readiness
