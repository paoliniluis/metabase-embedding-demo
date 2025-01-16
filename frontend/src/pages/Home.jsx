import React from 'react';
import { ArrowRight, BarChart2, PieChart, HelpCircle } from 'lucide-react';

const Home = () => {
  return (
    <div className="px-6 py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to your application</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          This would be your application, we're not using any embedding of Metabase yet. On the top bar you'll find the links to different embedding methods within Metabase.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 py-8">
        <FeatureCard 
          icon={<BarChart2 className="w-8 h-8 text-blue-500" />}
          title="Interactive embedding"
          description="This is an example of Metabase being embedded with interactive features."
          link="/interactive"
        />
        <FeatureCard 
          icon={<PieChart className="w-8 h-8 text-green-500" />}
          title="Static embedding"
          description="This is an example of Metabase being embedded without any interactivity (only filters)."
          link="/static"
        />
        <FeatureCard 
          icon={<HelpCircle className="w-8 h-8 text-purple-500" />}
          title="New question"
          description="This is an example of Metabase being embedded interactively but controlling where the user can go. In this case, the GUI question builder."
          link="/questions"
        />
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <a 
          href={link} 
          className="inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          Learn more 
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default Home;