#!/bin/bash

# First, ensure we're in the right directory
cd /path/to/roi-calculator

# Create all necessary directories first
mkdir -p src/components/layout
mkdir -p src/components/common
mkdir -p src/components/pages
mkdir -p src/hooks
mkdir -p src/contexts
mkdir -p src/types
mkdir -p src/utils

# Create the main App component
cat > src/App.tsx << 'EOF'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './components/pages/HomePage';
import { ROIAnalysisPage } from './components/pages/ROIAnalysisPage';
import { TCOAnalysisPage } from './components/pages/TCOAnalysisPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roi-analysis" element={<ROIAnalysisPage />} />
          <Route path="/tco-analysis" element={<TCOAnalysisPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
EOF

# Create the main entry point
cat > src/main.tsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# Create the global styles
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
EOF

# Create App.css (empty for now)
touch src/App.css

# Create vite-env.d.ts
cat > src/vite-env.d.ts << 'EOF'
/// <reference types="vite/client" />
EOF

# Create Layout component
cat > src/components/layout/Layout.tsx << 'EOF'
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
EOF

# Create Sidebar component
cat > src/components/layout/Sidebar.tsx << 'EOF'
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
EOF

# Create Header component
cat > src/components/layout/Header.tsx << 'EOF'
export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Financial Analysis Tools
        </h2>
      </div>
    </header>
  );
}
EOF

# Create common components
cat > src/components/common/Card.tsx << 'EOF'
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}
EOF

cat > src/components/common/AnimatedSection.tsx << 'EOF'
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSection({ children, delay = 0, className = '' }: AnimatedSectionProps) {
  return (
    <div 
      className={`animate-fade-in ${className}`} 
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
EOF

cat > src/components/common/index.ts << 'EOF'
export { Card } from './Card';
export { AnimatedSection } from './AnimatedSection';
EOF

# Create HomePage
cat > src/components/pages/HomePage.tsx << 'EOF'
import { Link } from 'react-router-dom';
import { Calculator, BarChart3 } from 'lucide-react';
import { Card } from '../common/Card';
import { AnimatedSection } from '../common/AnimatedSection';

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <AnimatedSection>
        <h1 className="text-3xl font-bold mb-6">Welcome to Nerdio Financial Tools</h1>
      </AnimatedSection>
      
      <AnimatedSection delay={100}>
        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/roi-analysis">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <Calculator className="w-12 h-12 text-purple-600" />
                <h2 className="text-xl font-semibold">ROI Calculator</h2>
              </div>
              <p className="text-gray-600">
                Calculate your 3-year Return on Investment with comprehensive analysis
                including implementation costs, sensitivity analysis, and financial metrics.
              </p>
            </Card>
          </Link>
          
          <Link to="/tco-analysis">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <BarChart3 className="w-12 h-12 text-purple-600" />
                <h2 className="text-xl font-semibold">TCO Analysis</h2>
              </div>
              <p className="text-gray-600">
                Compare your current infrastructure costs with cloud-optimized solutions
                over a 3-year period.
              </p>
            </Card>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
EOF

# Create a placeholder TCOAnalysisPage
cat > src/components/pages/TCOAnalysisPage.tsx << 'EOF'
import { Card } from '../common/Card';
import { AnimatedSection } from '../common/AnimatedSection';

export function TCOAnalysisPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <AnimatedSection>
        <h2 className="text-3xl font-bold mb-2">TCO Analysis</h2>
        <p className="text-gray-600 mb-8">Total Cost of Ownership Calculator</p>
      </AnimatedSection>
      
      <AnimatedSection delay={100}>
        <Card>
          <p className="text-gray-600">TCO Analysis page coming soon...</p>
        </Card>
      </AnimatedSection>
    </div>
  );
}
EOF

# Create useLocalStorage hook
cat > src/hooks/useLocalStorage.ts << 'EOF'
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
EOF

# Create the HTML entry point
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nerdio ROI Calculator</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Update types/index.ts to include ROI types
echo "export * from './roi.types';" >> src/types/index.ts

# Install missing dependencies
npm install react-router-dom

echo "Application structure created successfully!"
echo "Now run: npm run dev"