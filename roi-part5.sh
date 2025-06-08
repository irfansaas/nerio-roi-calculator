#!/bin/bash

# Update the ROIAnalysisPage to import the tab components
cat > src/components/pages/ROIAnalysisPage.tsx << 'EOF'
import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Calculator, BarChart3, FileText, Download, RefreshCw } from 'lucide-react';
import { Card } from '../common/Card';
import { AnimatedSection } from '../common/AnimatedSection';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ROICurrentState, ROIFutureState, ROIResults } from '../../types/roi.types';
import { calculateROI, formatCurrency, formatPercent } from '../../utils/roiCalculations';
import { ROISummaryTab } from './ROISummaryTab';
import { ROICurrentStateTab } from './ROICurrentStateTab';
import { ROIFutureStateTab } from './ROIFutureStateTab';
import { ROIImplementationTab } from './ROIImplementationTab';
import { ROISensitivityTab } from './ROISensitivityTab';

// Chart.js configuration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function ROIAnalysisPage() {
  const [activeTab, setActiveTab] = useState('summary');
  const [customerName, setCustomerName] = useState('');
  const [industry, setIndustry] = useState('');
  const [userCount, setUserCount] = useState(1000);
  const [currency, setCurrency] = useState('USD');
  const [results, setResults] = useState<ROIResults | null>(null);

  const [currentState, setCurrentState] = useLocalStorage<ROICurrentState>('roiCurrentState', {
    physicalServers: 300000,
    storageSystems: 200000,
    networkEquipment: 50000,
    datacenterCosts: 120000,
    vdiPlatformLicensing: 150000,
    supportMaintenance: 80000,
    vdiAdminFTE: 3,
    vdiAdminSalary: 95000,
    infraFTE: 2,
    infraSalary: 90000,
    storageAdminFTE: 1,
    storageAdminSalary: 100000,
    networkAdminFTE: 1,
    networkAdminSalary: 90000,
    securityFTE: 2,
    securitySalary: 100000,
    helpdeskFTE: 4,
    helpdeskSalary: 55000,
    opportunityCost: 0,
    downtimeCost: 0,
    overprovisioningCost: 0,
    complianceCost: 0
  });

  const [futureState, setFutureState] = useLocalStorage<ROIFutureState>('roiFutureState', {
    vmD4sQty: 30,
    vmD4sHours: 730,
    vmD4sRate: 0.192,
    vmD8sQty: 10,
    vmD8sHours: 730,
    vmD8sRate: 0.384,
    autoscalePercent: -65,
    riPercent: -30,
    premiumTB: 10,
    premiumRate: 150,
    standardTB: 20,
    standardRate: 50,
    diskSwapPercent: -50,
    nerdioCostPerUser: 4,
    m365CostPerUser: 35,
    cloudAdminFTE: 1.5,
    cloudAdminSalary: 110000,
    devOpsFTE: 1,
    devOpsSalary: 115000,
    securityNewFTE: 1,
    securityNewSalary: 100000,
    helpdeskNewFTE: 2,
    helpdeskNewSalary: 55000,
    migrationHours: 160,
    migrationRate: 250,
    archHours: 80,
    archRate: 300,
    implHours: 120,
    implRate: 225,
    testHours: 40,
    testRate: 200,
    trainHours: 40,
    trainRate: 175,
    internalHours: 100,
    internalRate: 150,
    travelCost: 5000,
    equipmentCost: 10000,
    parallelCost: 10000,
    rollbackCost: 5000,
    userAdoptionRate: 95,
    implementationTime: 5
  });

  useEffect(() => {
    const calculated = calculateROI(currentState, futureState, userCount, currency);
    setResults(calculated);
  }, [currentState, futureState, userCount, currency]);

  const exportResults = () => {
    if (!results) return;
    const exportData = { 
      customerName, 
      industry, 
      userCount, 
      currency, 
      date: new Date().toISOString(), 
      currentState, 
      futureState, 
      results 
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roi-analysis-${customerName || 'unnamed'}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetCalculator = () => {
    if (window.confirm('Reset all values to defaults?')) {
      setCustomerName('');
      setIndustry('');
      setUserCount(1000);
      setCurrency('USD');
      // Reset to default values
      setCurrentState({
        physicalServers: 300000,
        storageSystems: 200000,
        networkEquipment: 50000,
        datacenterCosts: 120000,
        vdiPlatformLicensing: 150000,
        supportMaintenance: 80000,
        vdiAdminFTE: 3,
        vdiAdminSalary: 95000,
        infraFTE: 2,
        infraSalary: 90000,
        storageAdminFTE: 1,
        storageAdminSalary: 100000,
        networkAdminFTE: 1,
        networkAdminSalary: 90000,
        securityFTE: 2,
        securitySalary: 100000,
        helpdeskFTE: 4,
        helpdeskSalary: 55000,
        opportunityCost: 0,
        downtimeCost: 0,
        overprovisioningCost: 0,
        complianceCost: 0
      });
      setFutureState({
        vmD4sQty: 30,
        vmD4sHours: 730,
        vmD4sRate: 0.192,
        vmD8sQty: 10,
        vmD8sHours: 730,
        vmD8sRate: 0.384,
        autoscalePercent: -65,
        riPercent: -30,
        premiumTB: 10,
        premiumRate: 150,
        standardTB: 20,
        standardRate: 50,
        diskSwapPercent: -50,
        nerdioCostPerUser: 4,
        m365CostPerUser: 35,
        cloudAdminFTE: 1.5,
        cloudAdminSalary: 110000,
        devOpsFTE: 1,
        devOpsSalary: 115000,
        securityNewFTE: 1,
        securityNewSalary: 100000,
        helpdeskNewFTE: 2,
        helpdeskNewSalary: 55000,
        migrationHours: 160,
        migrationRate: 250,
        archHours: 80,
        archRate: 300,
        implHours: 120,
        implRate: 225,
        testHours: 40,
        testRate: 200,
        trainHours: 40,
        trainRate: 175,
        internalHours: 100,
        internalRate: 150,
        travelCost: 5000,
        equipmentCost: 10000,
        parallelCost: 10000,
        rollbackCost: 5000,
        userAdoptionRate: 95,
        implementationTime: 5
      });
    }
  };

  const tabs = [
    { id: 'summary', label: 'Executive Summary', icon: TrendingUp },
    { id: 'current', label: 'Current State', icon: DollarSign },
    { id: 'future', label: 'Future State', icon: Calculator },
    { id: 'implementation', label: 'Implementation', icon: FileText },
    { id: 'sensitivity', label: 'Sensitivity Analysis', icon: BarChart3 }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <AnimatedSection>
        <h2 className="text-3xl font-bold mb-2">Nerdio ROI Calculator</h2>
        <p className="text-gray-600 mb-8">Comprehensive 3-Year Return on Investment Calculator</p>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <div className="flex flex-wrap gap-2 mb-6 bg-gray-100 p-2 rounded-lg">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                activeTab === tab.id ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        {activeTab === 'summary' && results && (
          <ROISummaryTab
            results={results}
            customerName={customerName}
            setCustomerName={setCustomerName}
            industry={industry}
            setIndustry={setIndustry}
            userCount={userCount}
            setUserCount={setUserCount}
            currency={currency}
            setCurrency={setCurrency}
            exportResults={exportResults}
            resetCalculator={resetCalculator}
          />
        )}
        {activeTab === 'current' && (
          <ROICurrentStateTab
            currentState={currentState}
            setCurrentState={setCurrentState}
            results={results}
            currency={currency}
          />
        )}
        {activeTab === 'future' && (
          <ROIFutureStateTab
            futureState={futureState}
            setFutureState={setFutureState}
            userCount={userCount}
            results={results}
            currency={currency}
          />
        )}
        {activeTab === 'implementation' && (
          <ROIImplementationTab
            futureState={futureState}
            setFutureState={setFutureState}
            results={results}
            currency={currency}
          />
        )}
        {activeTab === 'sensitivity' && results && (
          <ROISensitivityTab
            results={results}
            futureState={futureState}
            setFutureState={setFutureState}
            currency={currency}
          />
        )}
      </AnimatedSection>
    </div>
  );
}
EOF

# Update App.tsx to include the ROI Analysis page route
# First, let's check if the route already exists
if ! grep -q "ROIAnalysisPage" src/App.tsx; then
  echo "Adding ROIAnalysisPage import to App.tsx..."
  sed -i "/import { TCOAnalysisPage } from/a import { ROIAnalysisPage } from './components/pages/ROIAnalysisPage';" src/App.tsx
  
  echo "Adding ROI Analysis route to App.tsx..."
  sed -i '/<Route path="\/tco-analysis" element={<TCOAnalysisPage \/>} \/>/a\          <Route path="/roi-analysis" element={<ROIAnalysisPage />} />' src/App.tsx
fi

# Update Sidebar to include ROI Analysis navigation
if ! grep -q "roi-analysis" src/components/layout/Sidebar.tsx; then
  echo "Adding ROI Analysis to Sidebar navigation..."
  sed -i '/{ path: "\/tco-analysis", label: "TCO Analysis", icon: BarChart3 },/a\    { path: "/roi-analysis", label: "ROI Calculator", icon: Calculator },' src/components/layout/Sidebar.tsx
fi

# Install required dependencies (if not already installed)
echo "Installing required dependencies..."
npm install --save chart.js react-chartjs-2

# Update the types index file to export ROI types
echo "export * from './roi.types';" >> src/types/index.ts

echo "Part 5 completed: All files created and integrated into your app!"
echo ""
echo "ROI Calculator has been successfully added to your project!"
echo "You can now access it at: http://localhost:5173/roi-analysis"
echo ""
echo "To run your application:"
echo "1. npm run dev"
echo "2. Navigate to the ROI Calculator page from the sidebar"