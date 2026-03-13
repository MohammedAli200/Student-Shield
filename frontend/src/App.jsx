import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Auth & Layout
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import RoleBasedRedirect from './components/RoleBasedRedirect';

// Dashboards
import StudentDashboard from './pages/dashboard/StudentDashboard';
import CounselorDashboard from './pages/dashboard/CounselorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Student
import StudentWellness from './pages/dashboard/StudentWellness';
import AcademicProgress from './pages/dashboard/student/AcademicProgress';
import CounselingSuggestions from './pages/dashboard/student/CounselingSuggestions';
import CampusEvents from './pages/dashboard/student/CampusEvents';

// Counselor
import CounselorWellness from './pages/dashboard/CounselorWellness';
import HighRiskStudents from './pages/dashboard/counselor/HighRiskStudents';
import StudentAnalytics from './pages/dashboard/counselor/StudentAnalytics';
import ScheduleSessions from './pages/dashboard/counselor/ScheduleSessions';
import ManageAlerts from './pages/dashboard/counselor/ManageAlerts';

// Faculty
import FacultyDashboard from './pages/dashboard/FacultyDashboard';
import EnterStudentData from './pages/dashboard/faculty/EnterStudentData';
import FacultyStudentList from './pages/dashboard/faculty/StudentList';

// Admin
import AdminWellness from './pages/dashboard/AdminWellness';
import ManageStudents from './pages/dashboard/admin/ManageStudents';
import ManageCounselors from './pages/dashboard/admin/ManageCounselors';
import CampusFacilities from './pages/dashboard/admin/CampusFacilities';
import HostelRooms from './pages/dashboard/admin/HostelRooms';
import AlertsLogs from './pages/dashboard/admin/AlertsLogs';
import CampusIntelligence from './pages/dashboard/admin/CampusIntelligence';

// Shared
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route index element={<RoleBasedRedirect />} />

              {/* Student routes */}
              <Route path="student" element={<RoleProtectedRoute allowedRoles={['Student']}><Outlet /></RoleProtectedRoute>}>
                <Route index element={<StudentDashboard />} />
                <Route path="wellness" element={<StudentWellness />} />
                <Route path="academic" element={<AcademicProgress />} />
                <Route path="counseling" element={<CounselingSuggestions />} />
                <Route path="events" element={<CampusEvents />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Faculty routes */}
              <Route path="faculty" element={<RoleProtectedRoute allowedRoles={['Faculty']}><Outlet /></RoleProtectedRoute>}>
                <Route index element={<FacultyDashboard />} />
                <Route path="enter-data" element={<EnterStudentData />} />
                <Route path="students" element={<FacultyStudentList />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Counselor routes */}
              <Route path="counselor" element={<RoleProtectedRoute allowedRoles={['Counselor']}><Outlet /></RoleProtectedRoute>}>
                <Route index element={<CounselorDashboard />} />
                <Route path="wellness" element={<CounselorWellness />} />
                <Route path="high-risk" element={<HighRiskStudents />} />
                <Route path="analytics" element={<StudentAnalytics />} />
                <Route path="schedule" element={<ScheduleSessions />} />
                <Route path="alerts" element={<ManageAlerts />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Admin routes */}
              <Route path="admin" element={<RoleProtectedRoute allowedRoles={['Admin']}><Outlet /></RoleProtectedRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="wellness" element={<AdminWellness />} />
                <Route path="students" element={<ManageStudents />} />
                <Route path="counselors" element={<ManageCounselors />} />
                <Route path="facilities" element={<CampusFacilities />} />
                <Route path="hostel" element={<HostelRooms />} />
                <Route path="alerts" element={<AlertsLogs />} />
                <Route path="intelligence" element={<CampusIntelligence />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
