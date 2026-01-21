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
  Divider,
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

  if (loading)
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        <Spin size="large" />
        <span className="sr-only">Loading employee profile...</span>
      </div>
    )

  if (error)
    return (
      <div style={{ padding: 16 }}>
        <Alert type="error" message="Error loading profile" description={error} showIcon />
      </div>
    )

  if (!data) return null

  return (
    <div
      style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px' }}
      aria-label={`Profile of ${data.employeeName}`}
    >
      <Card
        bodyStyle={{ padding: 24 }}
        tabIndex={0} // Make the card focusable
      >
        {/* Header */}
        <Space
          direction="vertical"
          size="small"
          style={{ width: '100%' }}
        >
          <Title level={3} style={{ wordBreak: 'break-word' }}>
            {data.employeeName}
          </Title>
          <Text type="secondary">Current Role: {data.currentRole}</Text>
          <Text type="secondary">Target Role: {data.targetRole}</Text>
        </Space>

        <Divider />

        {/* 1️⃣ Visual Match */}
        <Title level={4}>Role Match</Title>
        <Progress
          percent={data.matchPercentage}
          status={data.matchPercentage >= 70 ? 'success' : 'active'}
          strokeWidth={16}
          style={{ width: '100%' }}
          format={percent => `${percent}% match`} // Screen reader friendly
          aria-label={`Role match percentage: ${data.matchPercentage}%`}
        />

        <Divider />

        {/* 2️⃣ Skill Gaps */}
        <Title level={4}>Skill Gaps</Title>
        <List
          dataSource={data.skillGaps}
          role="list"
          aria-label="Skill gaps"
          renderItem={gap => (
            <List.Item role="listitem">
              <Space
                direction="vertical"
                size="small"
                style={{ width: '100%' }}
              >
                <Space direction="vertical" style={{ flex: 1, minWidth: 0 }}>
                  <Text strong style={{ wordBreak: 'break-word' }}>
                    {gap.name}
                  </Text>
                  <Text type="secondary" style={{ wordBreak: 'break-word' }}>
                    Current: {gap.currentLevel} → Required: {gap.requiredLevel}
                  </Text>
                </Space>

                <Tag
                  color={importanceColorMap[gap.importance]}
                  aria-label={`Importance: ${gap.importance}`}
                >
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
          role="list"
          aria-label="Current expertise skills"
          renderItem={skill => (
            <List.Item role="listitem">
              <Space
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}
              >
                <Text style={{ minWidth: 120, wordBreak: 'break-word' }}>
                  {skill.name}
                </Text>
                <Rate
                  disabled
                  value={skill.level}
                  count={5}
                  aria-label={`${skill.name} expertise level: ${skill.level} out of 5`}
                />
              </Space>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export default EmployeeProfile
