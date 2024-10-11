import SuspenseComponent from 'components/suspense';
import React, { FC, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  return sessionStorage.getItem("accessToken") ? (
    <Suspense fallback={<SuspenseComponent />}>
      <div>
        <Element />
      </div>
    </Suspense>
  ) : (
    <Navigate to={""} />
  );
};

const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <Suspense fallback={<SuspenseComponent />}>
    <Element />
  </Suspense>
);

const UserDetailPage = React.lazy(() => import('app/user/'));
const AdminUsersListPage = React.lazy(() => import('app/admin/'));
const SignPage = React.lazy(() => import('app/auth'));
const LandingPage = React.lazy(() => import("app/landing"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* PRIVATE */}
      <Route path="/users" element={<Navigate to={'/users/:userId'} />} />
      <Route path={'/users/:userId/*'} element={<PrivateRoute element={UserDetailPage} />} />
      <Route path={'/admin/users/*'} element={<PrivateRoute element={AdminUsersListPage} />} />

      {/* PUBLIC */}
      <Route path={'/auth/*'} element={<PublicRoute element={SignPage} />} />
      <Route path={'/main/*'} element={<PublicRoute element={LandingPage} />} />
     
      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/main" />} />
    </Routes>
  );
};

export default AppRoutes;
