import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { EmailConfirmationPage } from './pages/EmailConfirmationPage';
import { CompleteProfilePage } from './pages/CompleteProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { FacilityDetailsPage } from './pages/FacilityDetailsPage';
import { CostComparisonPage } from './pages/CostComparisonPage';
import { MedicationsPage } from './pages/MedicationsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { MedicalRecordsPage } from './pages/MedicalRecordsPage';
import { RuralCarePage } from './pages/RuralCarePage';
import { BloodDonorsPage } from './pages/BloodDonorsPage';
import { MentalHealthPage } from './pages/MentalHealthPage';
import { HealthLibraryPage } from './pages/HealthLibraryPage';
import { FamilyCoordinationPage } from './pages/FamilyCoordinationPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { VerificationModerationPage } from './pages/VerificationModerationPage';
import { HelpInfoPages } from './pages/HelpInfoPages';
import { EmergencyPage } from './pages/EmergencyPage';

export function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Standalone Zero-Login Emergency Fast-Lane */}
            <Route path="/emergency" element={<EmergencyPage />} />

            {/* Dedicated Authentication Screens with AuthLayout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/email-confirmation" element={<EmailConfirmationPage />} />
            <Route path="/complete-profile" element={<CompleteProfilePage />} />

            {/* Main Application Pages wrapped in MainLayout with Top Navigation */}
            <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
            <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
            <Route path="/facilities" element={<MainLayout><FacilitiesPage /></MainLayout>} />
            <Route path="/facility/:id" element={<MainLayout><FacilityDetailsPage /></MainLayout>} />
            <Route path="/cost-comparison" element={<MainLayout><CostComparisonPage /></MainLayout>} />
            <Route path="/medications" element={<MainLayout><MedicationsPage /></MainLayout>} />
            <Route path="/appointments" element={<MainLayout><AppointmentsPage /></MainLayout>} />
            <Route path="/records" element={<MainLayout><MedicalRecordsPage /></MainLayout>} />
            <Route path="/rural-care" element={<MainLayout><RuralCarePage /></MainLayout>} />
            <Route path="/blood-donors" element={<MainLayout><BloodDonorsPage /></MainLayout>} />
            <Route path="/mental-health" element={<MainLayout><MentalHealthPage /></MainLayout>} />
            <Route path="/health-library" element={<MainLayout><HealthLibraryPage /></MainLayout>} />
            <Route path="/family" element={<MainLayout><FamilyCoordinationPage /></MainLayout>} />
            <Route path="/notifications" element={<MainLayout><NotificationsPage /></MainLayout>} />
            <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
            <Route path="/admin" element={<MainLayout><AdminDashboardPage /></MainLayout>} />
            <Route path="/verification" element={<MainLayout><VerificationModerationPage /></MainLayout>} />

            {/* Help & Legal Sub-routes */}
            <Route path="/help" element={<MainLayout><HelpInfoPages initialTab="help" /></MainLayout>} />
            <Route path="/privacy" element={<MainLayout><HelpInfoPages initialTab="privacy" /></MainLayout>} />
            <Route path="/consent" element={<MainLayout><HelpInfoPages initialTab="consent" /></MainLayout>} />
            <Route path="/accessibility" element={<MainLayout><HelpInfoPages initialTab="accessibility" /></MainLayout>} />

            {/* Fallback route redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
