import React from 'react';

import CreateForm from '@/components/parts/Dashboard/Form/CreateForm';
import LinkList from '@/components/parts/Dashboard/List/LinkList';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8">
        <LinkList />
      </div>

      <div className="col-span-4">
        <CreateForm />
      </div>
    </div>
  );
};

export default Dashboard;