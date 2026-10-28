import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataProvider';
import ToastContainer from './components/ui/ToastContainer';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import CreateTargetPage from './pages/CreateTargetPage';
import TargetDetailsPage from './pages/TargetDetailsPage';
import ActivityPage from './pages/ActivityPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * DevRaid Root Application Component.
 * Configures client-side routing, shared layouts, centralized state, and modern SaaS navigation.
 */
export function App() {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Operations Dashboard */}
            <Route index element={<DashboardPage />} />

            {/* Target Routes: /targets/new is matched ahead of /targets/:id */}
            <Route path="targets/new" element={<CreateTargetPage />} />
            <Route path="targets/:id" element={<TargetDetailsPage />} />

            {/* Platform Navigation Pages */}
            <Route path="activity" element={<ActivityPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />

            {/* 404 Not Found Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <ToastContainer />
      </AppDataProvider>
    </BrowserRouter>
  );
}

export default App;
