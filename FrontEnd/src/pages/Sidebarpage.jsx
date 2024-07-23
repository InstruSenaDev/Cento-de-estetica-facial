import React from 'react';
import Sidebar from '../componentes/SidebarLayout/SidebarLayout';
import MainContent from '../componentes/SidebarLayout/MainContent';
// import './style.css';

const SidebarLayout = () => {
  return (
    <div className="layout has-sidebar fixed-sidebar fixed-header">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default SidebarLayout;
