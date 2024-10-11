import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};


const UserPage = React.lazy(() => import('app/user/user.page'));

const LandingRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={UserPage} />} />
    </Routes>
  );
};

export default LandingRoutes;
