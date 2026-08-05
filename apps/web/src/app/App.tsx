import { Route, Routes } from 'react-router-dom';
import { PlatformBrandProvider } from '../theme/BrandProvider';
import { RequireRole } from '../features/auth/RequireRole';
import { SchoolScope } from './SchoolScope';

import { LandingPage } from '../features/landing/LandingPage';

import { AdminLoginPage } from '../features/admin/AdminLoginPage';
import { AdminLayout } from '../features/admin/AdminLayout';
import { AdminDashboardPage } from '../features/admin/AdminDashboardPage';
import { SchoolsPage } from '../features/admin/SchoolsPage';
import { SchoolDetailPage as AdminSchoolDetailPage } from '../features/admin/SchoolDetailPage';
import { StudentsPage as AdminStudentsPage } from '../features/admin/StudentsPage';
import { StudentDetailPage as AdminStudentDetailPage } from '../features/admin/StudentDetailPage';
import { ServicesPage } from '../features/admin/ServicesPage';
import { UniversitiesPage } from '../features/admin/UniversitiesPage';
import { UniversityDetailPage } from '../features/admin/UniversityDetailPage';
import { PaymentsPage } from '../features/admin/PaymentsPage';
import { AnnouncementsPage } from '../features/admin/AnnouncementsPage';

import { SchoolLoginPage } from '../features/school/SchoolLoginPage';
import { SchoolLayout } from '../features/school/SchoolLayout';
import { SchoolDashboardPage } from '../features/school/SchoolDashboardPage';
import { StudentsPage } from '../features/school/StudentsPage';
import { InvitesPage } from '../features/school/InvitesPage';
import { BrandingPage } from '../features/school/BrandingPage';

import { JoinPage } from '../features/student/JoinPage';
import { ActivatePage } from '../features/student/ActivatePage';
import { StudentLoginPage } from '../features/student/StudentLoginPage';
import { StudentLayout } from '../features/student/StudentLayout';
import { StudentDashboardPage } from '../features/student/StudentDashboardPage';
import { RiasecTestPage } from '../features/student/RiasecTestPage';
import { ResultsPage } from '../features/student/ResultsPage';
import { ProfilePage } from '../features/student/profile/ProfilePage';
import { ServiceDetailPage } from '../features/student/services/ServiceDetailPage';
import { CartPage } from '../features/student/cart/CartPage';
import { PurchasesPage } from '../features/student/PurchasesPage';
import { FormFillPage } from '../features/student/forms/FormFillPage';
import { TestPrepTrackPage } from '../features/student/testprep/TestPrepTrackPage';
import { TestPrepCoursePage } from '../features/student/testprep/TestPrepCoursePage';
import { TestPrepTestPage } from '../features/student/testprep/TestPrepTestPage';

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PlatformBrandProvider>
            <LandingPage />
          </PlatformBrandProvider>
        }
      />

      <Route
        path="/admin/login"
        element={
          <PlatformBrandProvider>
            <AdminLoginPage />
          </PlatformBrandProvider>
        }
      />
      <Route
        path="/admin"
        element={
          <PlatformBrandProvider>
            <RequireRole roles={['admin']} redirectTo="/admin/login">
              <AdminLayout />
            </RequireRole>
          </PlatformBrandProvider>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="schools" element={<SchoolsPage />} />
        <Route path="schools/:schoolId" element={<AdminSchoolDetailPage />} />
        <Route path="students" element={<AdminStudentsPage />} />
        <Route path="students/:schoolId/:studentId" element={<AdminStudentDetailPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="universities" element={<UniversitiesPage />} />
        <Route path="universities/:universityId" element={<UniversityDetailPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="announcements" element={<AnnouncementsPage />} />
      </Route>

      <Route
        path="/s/:schoolSlug/login"
        element={
          <SchoolScope>
            <SchoolLoginPage />
          </SchoolScope>
        }
      />
      <Route
        path="/s/:schoolSlug/join/:token"
        element={
          <SchoolScope>
            <JoinPage />
          </SchoolScope>
        }
      />
      <Route
        path="/s/:schoolSlug/activate/:token"
        element={
          <SchoolScope>
            <ActivatePage />
          </SchoolScope>
        }
      />
      <Route
        path="/s/:schoolSlug/student/login"
        element={
          <SchoolScope>
            <StudentLoginPage />
          </SchoolScope>
        }
      />

      <Route
        path="/s/:schoolSlug/school"
        element={
          <SchoolScope>
            <RequireRole roles={['school', 'admin']} redirectTo="../login">
              <SchoolLayout />
            </RequireRole>
          </SchoolScope>
        }
      >
        <Route index element={<SchoolDashboardPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="invites" element={<InvitesPage />} />
        <Route path="branding" element={<BrandingPage />} />
      </Route>

      <Route
        path="/s/:schoolSlug/student"
        element={
          <SchoolScope>
            <RequireRole roles={['student', 'admin']} redirectTo="../student/login">
              <StudentLayout />
            </RequireRole>
          </SchoolScope>
        }
      >
        <Route index element={<StudentDashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="purchases" element={<PurchasesPage />} />
        <Route path="forms/:formId" element={<FormFillPage />} />
        <Route path="test-prep/:serviceId" element={<TestPrepTrackPage />} />
        <Route path="test-prep/:serviceId/courses/:courseId" element={<TestPrepCoursePage />} />
        <Route path="test-prep/:serviceId/tests/:testId" element={<TestPrepTestPage />} />
        <Route path="test" element={<RiasecTestPage />} />
        <Route path="results" element={<ResultsPage />} />
      </Route>
    </Routes>
  );
}
