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
