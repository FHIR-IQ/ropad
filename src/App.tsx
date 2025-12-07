import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
// Import pages
import Dashboard from './pages/Dashboard';
import MedicationTracker from './pages/MedicationTracker';
import DeviceMonitor from './pages/DeviceMonitor';
import ActivityTracker from './pages/ActivityTracker';
import AIGuardian from './pages/AIGuardian';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="medication" element={<MedicationTracker />} />
          <Route path="devices" element={<DeviceMonitor />} />
          <Route path="activities" element={<ActivityTracker />} />
          <Route path="guardian" element={<AIGuardian />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
