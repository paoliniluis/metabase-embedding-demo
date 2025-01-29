import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart, BarChart2, PieChart, HelpCircle } from 'lucide-react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const NavLink = ({ path, children }) => (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${location.pathname === path 
          ? 'bg-blue-100 text-blue-700' 
          : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
        }`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex items-center h-25 gap-8">
            {/* Logo/Home */}
            <NavLink path="/">
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            
            {/* Interactive embedding */}
            <NavLink path="/interactive_embedding">
              <BarChart2 size={20} />
              <span>Interactive</span>
            </NavLink>
            
            {/* Static embedding */}
            <NavLink path="/static_dashboard">
              <PieChart size={20} />
              <span>Static Dashboard</span>
            </NavLink>

            <NavLink path="/static_question">
              <PieChart size={20} />
              <span>Static question</span>
            </NavLink>

            {/* SDK embedding */}
            <NavLink path="/sdk_interactive_dashboard">
              <BarChart size={20} />
              <span>SDK Interactive Dashboard</span>
            </NavLink>

            <NavLink path="/sdk_static_dashboard">
              <BarChart size={20} />
              <span>SDK Static Dashboard</span>
            </NavLink>
            
            <NavLink path="/sdk_interactive_question">
              <BarChart size={20} />
              <span>SDK interactive question</span>
            </NavLink>
            
            <NavLink path="/sdk_static_question">
              <BarChart size={20} />
              <span>SDK static question</span>
            </NavLink>
            
            <NavLink path="/sdk_query_builder">
              <BarChart size={20} />
              <span>SDK query builder</span>
            </NavLink>


            {/* Interactive embedding + New question */}
            <NavLink path="/interactive_question_builder">
              <HelpCircle size={20} />
              <span>Interactive question builder</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;