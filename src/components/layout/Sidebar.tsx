import { Link, useLocation } from 'react-router-dom';
import { Home, Calculator, BarChart3 } from 'lucide-react';

const navigation = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/roi-analysis', label: 'ROI Calculator', icon: Calculator },
  { path: '/tco-analysis', label: 'TCO Analysis', icon: BarChart3 },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="bg-gray-900 text-white w-64 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Nerdio Tools</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
