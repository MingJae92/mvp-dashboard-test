import { useEffect, useState } from 'react'
import axios from 'axios'

export function useReadiness(employeeId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!employeeId) return

    setLoading(true)
    setError(null)

    axios
      .get(
        `https://fantastic-fortnight-7r95qxrxg736qw-8001.app.github.dev/readiness?employeeId=${employeeId}`
      )
      .then(res => setData(res.data[0]))
      .catch(() => setError('Failed to load readiness data'))
      .finally(() => setLoading(false))
  }, [employeeId])

  return { data, loading, error }
}
