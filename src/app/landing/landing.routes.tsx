import React, { FC, PropsWithChildren, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};


const LandingPage = React.lazy(() => import('app/landing/landing.page'));

const LandingRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspended element={LandingPage} />} />
    </Routes>
  );
};

export default LandingRoutes;
