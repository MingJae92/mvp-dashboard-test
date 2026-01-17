import { useState, useEffect } from 'react'
import { Input, Card, List, Tag, Typography, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Text } = Typography

function SkillSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchTerm.length > 2) {
      setLoading(true)
      
      // Simulating API call with delay
      setTimeout(() => {
        axios.get(`http://localhost:8001/skills?q=${searchTerm}`)
          .then(response => {
            setSkills(response.data)
            setLoading(false)
          })
          .catch(error => {
            console.error('Error fetching skills:', error) 
            setLoading(false)
          })
      }, 500)
    } else {
      setSkills([])
    }
  }, [searchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <Title level={2}>Skill Search</Title>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Input
          size="large"
          placeholder="Search for skills (e.g., JavaScript, Project Management)"
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          value={searchTerm}
        />
        
        
        {loading && <Text type="secondary">Searching...</Text>}
        
        <Card>
          <List
            dataSource={skills}
            locale={{ emptyText: 'Start typing to search for skills' }}
            renderItem={(skill) => (
              <List.Item>
                <List.Item.Meta
                  title={skill.name}
                  description={
                    <Space>
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
