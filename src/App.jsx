import { Routes, Route, Navigate } from 'react-router-dom'

import AppLayout from './app/AppLayout'
import EmployeeList from './components/EmployeeList'
import SkillSearch from './components/SkillSearch'
import Readiness from './components/Readiness'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/search" element={<SkillSearch />} />
        <Route path="/readiness" element={<Readiness />} />
        <Route path="*" element={<Navigate to="/employees" replace />} />
      </Routes>
    </AppLayout>
  )
}

export default App
