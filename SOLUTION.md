Role Readiness Dashboard – Technical Challenge Solutions
0. Task 1: Fix Something (The "Sync" Bug)
Bug Description:

The HR team reported that the skill search and employee list were behaving strangely. Specifically:

Searching for a skill often displayed results from the previous search.

This was caused by a stale state issue in React due to asynchronous updates.

Rapid typing made the problem worse, as the component would render outdated results.

Fix Implemented:

Updated SkillSearch.jsx and EmployeeList.jsx to properly handle state updates.

Implemented debouncing to reduce unnecessary API calls during rapid typing.

Ensured the component waits for the latest state before rendering results.

Verified that search results now match the current input immediately.

Trade-off Considered:
Debouncing introduces a slight delay (~300ms) in showing results, but it significantly improves performance and fixes the stale state bug.

1. AI Usage

I used AI tools (ChatGPT) to scaffold React components and custom hooks (useEmployees, useReadiness) and to suggest suitable Ant Design components (Progress, Rate, List, Tag).

Did You Have to Correct Any of Its Suggestions?

Yes. While AI was helpful for accelerating setup and structure, several suggestions required correction to align with real API behavior, data integrity, and UX expectations.

Key corrections made:

Data source alignment:
AI initially assumed the employees and readiness APIs could be used interchangeably. I corrected this by ensuring the dropdown and profile views are driven only by readiness data, preventing users from selecting employees without readiness records.

Stale state handling:
Some early suggestions did not fully address React’s asynchronous state updates. I refined the logic in SkillSearch and EmployeeList to eliminate stale state issues and added debouncing to handle rapid input correctly.

Conditional rendering:
AI-generated components sometimes assumed complete datasets. I added defensive rendering to handle missing or partial readiness data gracefully without causing blank screens or crashes.

Routing assumptions:
I adjusted how employeeId was passed and consumed to ensure URLs always resolved to valid readiness data and invalid IDs were handled safely.

Summary:
AI accelerated development, but each suggestion was validated and adapted. The final implementation reflects deliberate architectural and UX decisions rather than accepting AI output verbatim.

2. UX Decisions
Components Chosen:

Select – clean dropdown for choosing employees.

Card – sections for employee info, match, and skill gaps.

Progress – visual readiness percentage.

List + Tag – clearly presents skill gaps with importance color coding.

Rate – displays current expertise levels (1–5).

Spin + Alert – handles loading and error feedback.

Reasoning:

Users can quickly scan readiness, identify critical gaps, and understand expertise levels at a glance. Visual hierarchy and color cues reduce cognitive load and support fast decision-making.

3. Trade-offs

Fetching data:
Fetched readiness data directly for the dropdown instead of merging multiple APIs. This simplifies logic but may fetch unnecessary records at scale.

Visual indicators:
Used Progress and Rate for clarity and speed. More advanced charts (e.g., radar charts) could add insight but increase complexity.

Skill gap detail density:
All skill gaps are displayed in a single list. For large skill sets, pagination or collapsible sections would be preferable.

4. Edge Cases

No readiness data for employee – filtered out in the dropdown to prevent blank selections.

Partial data – UI gracefully handles missing currentLevel or requiredLevel.

Network errors – loading and failure states handled with Spin and Alert.

Extreme match percentages – visual feedback remains clear at both high and low values.

Large skill lists – scrollable but would benefit from improved UX at scale.

Invalid employee ID in URL – renders safely without crashes.

5. "If I Had More Time" List

Interactive skill gap charts (bar or radar).

Sorting and filtering by importance or gap severity.

Historical readiness tracking over time.

Searchable dropdown for large organisations.

Full responsive support for mobile and tablet.

Tooltips and micro-interactions for clarity.

Mock “what-if” scenarios for skill progression.

Unit and integration tests using React Testing Library and Jest/Vitest.

Deployment setup using Vercel/Netlify or Docker with CI/CD.

6. Framework Rules
Limitations:

Some Ant Design components (e.g. Progress, Rate) lack built-in labels.

Deeper visual customisation requires overrides or ConfigProvider.

Custom Branding Strategy:

Use ConfigProvider and Less variables for colors, typography, and spacing.

Create reusable wrapper components for consistent styling.

Centralise overrides to maintain brand consistency.

7. Notes on Testing and Deployment

Testing:
Would add unit tests for hooks and components, plus integration tests for routing and dropdown-to-profile flows.

Deployment:
Would deploy via Vercel or Netlify, or containerise with Docker and add CI/CD for automated builds and releases.

8. Final App.js File

This is the final modular version of the App.js file with routing cleanly separated and wrapped in a shared layout.

import { Routes, Route, Navigate } from 'react-router-dom'

import AppLayout from './app/AppLayout'
import EmployeeList from './components/EmployeeList'
import SkillSearch from './components/SkillSearch'
import Readiness from './components/Readiness'
import EmployeeProfile from './components/EmployeeProfile'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/search" element={<SkillSearch />} />
        <Route path="/readiness" element={<Readiness />} />
        <Route path="*" element={<Navigate to="/employees" replace />} />
        <Route path="/employees/:employeeId" element={<EmployeeProfile />} />
      </Routes>
    </AppLayout>
  )
}

export default App