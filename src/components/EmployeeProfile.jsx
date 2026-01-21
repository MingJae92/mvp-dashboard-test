import { useParams } from 'react-router-dom'
import {
  Card,
  Typography,
  Spin,
  Alert,
  Progress,
  List,
  Tag,
  Rate,
  Space,
  Divider
} from 'antd'
import { useReadiness } from '../hooks/useReadiness'

const { Title, Text } = Typography

const importanceColorMap = {
  critical: 'red',
  important: 'orange',
  'nice-to-have': 'blue',
}

function EmployeeProfile() {
  const { employeeId } = useParams()
  const { data, loading, error } = useReadiness(employeeId)

  if (loading) return <Spin size="large" />
  if (error) return <Alert type="error" message={error} />
  if (!data) return null

  return (
    <Card>
      {/* Header */}
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={3}>{data.employeeName}</Title>
        <Text type="secondary">
          Current Role: {data.currentRole}
        </Text>
        <Text type="secondary">
          Target Role: {data.targetRole}
        </Text>
      </Space>

      <Divider />

      {/* 1️⃣ Visual Match */}
      <Title level={4}>Role Match</Title>
      <Progress
        percent={data.matchPercentage}
        status={data.matchPercentage >= 70 ? 'success' : 'active'}
      />

      <Divider />

      {/* 2️⃣ Skill Gaps */}
      <Title level={4}>Skill Gaps</Title>
      <List
        dataSource={data.skillGaps}
        renderItem={gap => (
          <List.Item>
            <Space
              style={{
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Space direction="vertical">
                <Text strong>{gap.name}</Text>
                <Text type="secondary">
                  Current: {gap.currentLevel} → Required: {gap.requiredLevel}
                </Text>
              </Space>

              <Tag color={importanceColorMap[gap.importance]}>
                {gap.importance}
              </Tag>
            </Space>
          </List.Item>
        )}
      />

      <Divider />

      {/* 3️⃣ Expertise Levels */}
      <Title level={4}>Current Expertise</Title>
      <List
        dataSource={data.currentSkills}
        renderItem={skill => (
          <List.Item>
            <Space
              style={{
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Text>{skill.name}</Text>
              <Rate disabled value={skill.level} count={5} />
            </Space>
          </List.Item>
        )}
      />
    </Card>
  )
}

export default EmployeeProfile
