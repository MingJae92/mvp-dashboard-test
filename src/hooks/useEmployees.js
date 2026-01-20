import { useEffect, useState } from 'react'
import axios from 'axios'

export function useEmployees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('https://fantastic-fortnight-7r95qxrxg736qw-8001.app.github.dev/employees')
      .then(res => setEmployees(res.data))
      .catch(() => setError('Failed to load employees'))
      .finally(() => setLoading(false))
  }, [])

  return { employees, loading, error }
}
