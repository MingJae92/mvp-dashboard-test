# Role Readiness Dashboard – Technical Challenge Solutions

## 0. Task 1: Fix Something (The "Sync" Bug)

### Bug Description:
The HR team reported that the skill search and employee list were behaving strangely. Specifically:

- Searching for a skill often displayed results from the **previous search**.
- This was caused by a **stale state issue** in React due to asynchronous updates.
- Rapid typing made the problem worse, as the component would render outdated results.

### Fix Implemented:
- Updated `SkillSearch.jsx` and `EmployeeList.jsx` to properly handle state updates.
- Implemented **debouncing** to reduce unnecessary API calls during rapid typing.
- Ensured the component waits for the latest state before rendering results.
- Verified that search results now match the current input immediately.

**Trade-off Considered:**  
Debouncing introduces a slight delay (~300ms) in showing results, but it significantly improves performance and fixes the stale state bug.

---

## 1. AI Usage

I used AI tools (ChatGPT) to scaffold React components and custom hooks (`useEmployees`, `useReadiness`) and suggested Ant Design components (`Progress`, `Rate`, `List`, `Tag`).

### Corrections Made:
- Filtered out employees without readiness data to prevent blank profiles.
- Adjusted layout and spacing for clarity.
- Enhanced error handling and conditional rendering.
- Added importance-color mapping for skill gaps.

### Did You Have to Correct Any of Its Suggestions?

Yes. While AI was helpful for accelerating setup and overall structure, several suggestions required correction to align with real API behavior, data integrity, and UX expectations.

### Key Corrections Made:

### Data source alignment:
AI initially assumed the employees and readiness APIs could be used interchangeably. I corrected this by ensuring the dropdown and profile views are driven only by readiness data, preventing users from selecting employees without readiness records.

### Stale state handling:
Some early suggestions did not fully account for React’s asynchronous state updates. I refined the logic in SkillSearch.jsx and EmployeeList.jsx to fully eliminate stale state issues and introduced debouncing to handle rapid input correctly.

### Conditional rendering:
AI-generated components often assumed complete datasets. I added defensive rendering to gracefully handle missing or partial readiness data, avoiding blank screens or runtime errors.

### Routing assumptions:
I adjusted how employeeId was passed and consumed to ensure URLs always resolved to valid readiness data, and that invalid IDs were handled safely without crashing the application.

### Summary:

AI significantly accelerated development, but every suggestion was reviewed and adapted. The final implementation reflects deliberate architectural, data, and UX decisions rather than accepting AI output verbatim.
---

## 2. UX Decisions

### Components Chosen:
- **Select** – clean dropdown for choosing employees.
- **Card** – sections for employee info, match, skill gaps.
- **Progress** – visual readiness percentage.
- **List + Tag** – shows skill gaps clearly with importance color coding.
- **Rate** – displays current expertise levels (1–5).
- **Spin + Alert** – handles loading and error feedback.

### Reasoning:
Users can scan readiness, skill gaps, and expertise levels at a glance. Visual cues reduce cognitive load and allow for quick decision-making.

---

## 3. Trade-offs

- **Fetching data:** Fetched all readiness data for the dropdown instead of merging separate employees and readiness APIs. This reduces complexity but may fetch unnecessary employee info if the team is large.
- **Visual indicators:** Chose `Progress` and `Rate` for simplicity; more detailed charts (e.g., radar charts for skill coverage) would be richer but add complexity.
- **Skill gap details:** Shows all gaps in a list; if the team has many skills, it could become long. Pagination or collapsible sections could help.

---

## 4. Edge Cases

- **No readiness data for employee** – filtered out in dropdown to prevent blank selections.
- **Partial data** – some employees may lack certain skills; the UI handles missing `currentLevel` or `requiredLevel` gracefully.
- **Network errors** – `Spin` and `Alert` show loading states and API failures.
- **High/low match percentages** – `Progress` changes color based on threshold (>=70% success vs active).
- **Large skill lists** – currently scrollable; would require better UX for teams with 20+ skills.
- **Invalid employee ID in URL** – shows `null` with no crash.

---

## 5. "If I Had More Time" List

- Interactive skill gap charts (bars or radar) for deeper insight.
- Sort/filter by skill importance or gap severity.
- Historical readiness trends for tracking progress.
- Searchable employee dropdown for large teams.
- Responsive design for mobile/tablet.
- Tooltips and animations for context.
- Mock scenarios to visualize potential skill growth.
- Unit and integration testing for all components.
- Deployment setup for live environment and CI/CD.

---

## 6. Framework Rules

### Limitations:
- Some Ant Design components (e.g., `Progress`, `Rate`) do not have labels by default.
- Overriding default styles sometimes requires custom CSS or `ConfigProvider`.

### Custom Branding Strategy:
- Use `ConfigProvider` and Less variables for colors, fonts, spacing.
- Create reusable wrappers for `Card`, `List`, `Rate`.
- Override defaults to match brand identity consistently.

---

## 7. Notes on Testing and Deployment

- **Unit & Integration Testing:** Would use React Testing Library and Jest/Vitest to test hooks, dropdown functionality, and readiness display.
- **Deployment:** Set up with Vercel/Netlify or Dockerized app with CI/CD pipeline for continuous deployment if more time was available.

---

## 8. Final App.js File

This is the final modular version of the `App.js` file with all routes and components integrated.

```jsx
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
