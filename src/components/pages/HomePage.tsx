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
