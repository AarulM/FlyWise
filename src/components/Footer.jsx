import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--primary-blue)' }} className="text-white py-8 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg">
                <div className="w-2 h-2 bg-accent-yellow rounded-full"></div>
              </div>
              <span className="text-xl font-bold">FlyWise</span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Find the right moment to buy — with confidence. 
              Transparent fees, explainable alerts, and clear BUY vs WATCH recommendations.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-200 hover:text-white">About</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white">Methodology</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-200 hover:text-white">Privacy</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white">Terms</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white">Data Sources</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-300 text-sm">
              © 2024 FlyWise. Data provided by multiple sources with known coverage gaps.
            </p>
            <p className="text-blue-400 text-xs">
              We show what we know — and what we don't.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
