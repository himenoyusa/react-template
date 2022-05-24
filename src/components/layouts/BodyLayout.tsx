import React from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '../ui/Loading';

const BodyLayout = () => {
  return (
    <div className="flex h-full">
      <React.Suspense fallback={<Loading />}>
        <Outlet />
      </React.Suspense>
    </div>
  );
};

export default BodyLayout;
