import { useEffect, useState } from 'react'
import axios from 'axios'

export function useEmployees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReadinessEmployees = async () => {
      try {
        setLoading(true)
        // 1️⃣ Fetch all readiness data
        const res = await axios.get(
          'https://fantastic-fortnight-7r95qxrxg736qw-8001.app.github.dev/readiness'
        )
        // 2️⃣ Map to a simplified list of employees
        const readinessEmployees = res.data.map(r => ({
          id: r.employeeId,
          name: r.employeeName,
          role: r.currentRole,
        }))
        setEmployees(readinessEmployees)
      } catch (err) {
        setError('Failed to load employees with readiness data')
      } finally {
        setLoading(false)
      }
    }

    fetchReadinessEmployees()
  }, [])

  return { employees, loading, error }
}
