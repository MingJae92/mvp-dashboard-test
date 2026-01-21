import { useState, useEffect, useMemo } from 'react'
import { Input, Card, List, Tag, Typography, Space, Alert } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { debounce } from 'lodash'
import axios from 'axios'

const { Title, Text } = Typography

function SkillSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const BACKEND_URL = 'https://fantastic-fortnight-7r95qxrxg736qw-8001.app.github.dev'

  // Debounced fetch function
  const debouncedFetch = useMemo(
    () =>
      debounce(async query => {
        try {
          setLoading(true)
          setError(null)
          const response = await axios.get(`${BACKEND_URL}/skills?q=${query}`)
          if (response.data.length === 0) {
            setSkills([])
            setError('No skills found for your search.')
          } else {
            setSkills(response.data)
          }
        } catch (err) {
          console.error('Error fetching skills:', err)
          setSkills([])
          setError('Failed to fetch skills. Please try again.')
        } finally {
          setLoading(false)
        }
      }, 300),
    []
  )

  useEffect(() => {
    if (searchTerm.length < 3) {
      setSkills([])
      setError(null)
      return
    }

    debouncedFetch(searchTerm)

    return () => debouncedFetch.cancel()
  }, [searchTerm, debouncedFetch])

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px' }}>
      <Title level={2}>Skill Search</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Search Input */}
        <Input
          size="large"
          placeholder="Search for skills (e.g., JavaScript, Docker)"
          prefix={<SearchOutlined />}
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
        />

        {/* Loading & Error */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text type="secondary">Searching...</Text>
          </div>
        )}
        {error && <Alert type="error" message={error} showIcon />}

        {/* Skills List */}
        <Card bodyStyle={{ padding: 16 }}>
          <List
            dataSource={skills}
            locale={{ emptyText: error ? null : 'Start typing to search for skills' }}
            renderItem={skill => (
              <List.Item>
                <List.Item.Meta
                  title={skill.name}
                  description={
                    <Space size={[4, 8]} wrap>
                      <Tag color="blue">{skill.category}</Tag>
                      <Text type="secondary">{skill.description}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </div>
  )
}

export default SkillSearch
