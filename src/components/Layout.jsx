import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
