#!/bin/bash

# Create ROIFutureStateTab component
cat > src/components/pages/ROIFutureStateTab.tsx << 'EOF'
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/roiCalculations';
import { ROIFutureState } from '../../types/roi.types';

const BENEFITS_MULTIPLIER = 1.3;

interface ROIFutureStateTabProps {
  futureState: ROIFutureState;
  setFutureState: (state: ROIFutureState) => void;
  userCount: number;
  results: any;
  currency: string;
}

export function ROIFutureStateTab({ 
  futureState, 
  setFutureState, 
  userCount, 
  results, 
  currency 
}: ROIFutureStateTabProps) {
  const updateField = (field: keyof ROIFutureState, value: string) => {
    setFutureState({ ...futureState, [field]: parseFloat(value) || 0 });
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Azure Compute Costs</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Standard_D4s_v4</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={futureState.vmD4sQty}
                onChange={(e) => updateField('vmD4sQty', e.target.value)}
                className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Qty"
              />
              <input
                type="number"
                value={futureState.vmD4sHours}
                onChange={(e) => updateField('vmD4sHours', e.target.value)}
                className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Hours/Month"
              />
              <input
                type="number"
                value={futureState.vmD4sRate}
                onChange={(e) => updateField('vmD4sRate', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Rate/Hour"
                step="0.001"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Standard_D8s_v4</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={futureState.vmD8sQty}
                onChange={(e) => updateField('vmD8sQty', e.target.value)}
                className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Qty"
              />
              <input
                type="number"
                value={futureState.vmD8sHours}
                onChange={(e) => updateField('vmD8sHours', e.target.value)}
                className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Hours/Month"
              />
              <input
                type="number"
                value={futureState.vmD8sRate}
                onChange={(e) => updateField('vmD8sRate', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Rate/Hour"
                step="0.001"
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded">
            <label className="block text-sm font-medium text-green-700 mb-1">Auto-scaling Savings %</label>
            <input
              type="number"
              value={futureState.autoscalePercent}
              onChange={(e) => updateField('autoscalePercent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              max="0"
              placeholder="-65"
            />
            <p className="text-xs text-green-600 mt-1">Typically -65% reduction</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <label className="block text-sm font-medium text-green-700 mb-1">Reserved Instance Discount %</label>
            <input
              type="number"
              value={futureState.riPercent}
              onChange={(e) => updateField('riPercent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              max="0"
              placeholder="-30"
            />
            <p className="text-xs text-green-600 mt-1">Typically -30% discount</p>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded mt-4">
          <p className="text-sm font-medium">
            Total Annual Compute: {formatCurrency(
              ((futureState.vmD4sQty * futureState.vmD4sHours * futureState.vmD4sRate) * 12 +
               (futureState.vmD8sQty * futureState.vmD8sHours * futureState.vmD8sRate) * 12) *
              (1 + futureState.autoscalePercent / 100) * (1 + futureState.riPercent / 100), currency
            )}
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Storage Costs</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Premium SSD</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={futureState.premiumTB}
                onChange={(e) => updateField('premiumTB', e.target.value)}
                className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="TB"
              />
              <input
                type="number"
                value={futureState.premiumRate}
                onChange={(e) => updateField('premiumRate', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Rate/TB/Month"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Standard SSD</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={futureState.standardTB}
                onChange={(e) => updateField('standardTB', e.target.value)}
                className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="TB"
              />
              <input
                type="number"
                value={futureState.standardRate}
                onChange={(e) => updateField('standardRate', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Rate/TB/Month"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Disk Swapping Savings %</label>
            <input
              type="number"
              value={futureState.diskSwapPercent}
              onChange={(e) => updateField('diskSwapPercent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              max="0"
              placeholder="-50"
            />
            <p className="text-xs text-green-600 mt-1">Typically -50% reduction</p>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded mt-4">
          <p className="text-sm font-medium">
            Total Annual Storage: {formatCurrency(
              ((futureState.premiumTB * futureState.premiumRate) * 12 +
               (futureState.standardTB * futureState.standardRate) * 12) *
              (1 + futureState.diskSwapPercent / 100), currency
            )}
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Licensing Costs</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nerdio Manager</label>
            <input
              type="number"
              value={futureState.nerdioCostPerUser}
              onChange={(e) => updateField('nerdioCostPerUser', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              step="0.01"
              placeholder="$/user/month"
            />
            <p className="text-xs text-gray-500 mt-1">For {userCount} users</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Microsoft 365 E3</label>
            <input
              type="number"
              value={futureState.m365CostPerUser}
              onChange={(e) => updateField('m365CostPerUser', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              step="0.01"
              placeholder="$/user/month"
            />
            <p className="text-xs text-gray-500 mt-1">For {userCount} users</p>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded mt-4">
          <p className="text-sm font-medium">
            Total Annual Licensing: {formatCurrency(
              (userCount * futureState.nerdioCostPerUser * 12) + 
              (userCount * futureState.m365CostPerUser * 12), currency
            )}
          </p>
        </div>
      </Card>

      <Card>
<h3 className="text-xl font-semibold mb-4">Reduced Operational Costs</h3>
       <div className="space-y-4">
         {[
           { label: 'Cloud Administrators', fte: 'cloudAdminFTE', salary: 'cloudAdminSalary' },
           { label: 'DevOps Engineer', fte: 'devOpsFTE', salary: 'devOpsSalary' },
           { label: 'Security Specialist', fte: 'securityNewFTE', salary: 'securityNewSalary' },
           { label: 'Help Desk', fte: 'helpdeskNewFTE', salary: 'helpdeskNewSalary' }
         ].map(({ label, fte, salary }) => (
           <div key={fte} className="grid md:grid-cols-3 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
               <div className="flex gap-2">
                 <input
                   type="number"
                   value={futureState[fte as keyof ROIFutureState]}
                   onChange={(e) => updateField(fte as keyof ROIFutureState, e.target.value)}
                   className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                   step="0.5"
                   placeholder="FTE"
                 />
                 <input
                   type="number"
                   value={futureState[salary as keyof ROIFutureState]}
                   onChange={(e) => updateField(salary as keyof ROIFutureState, e.target.value)}
                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                   placeholder="Annual Salary"
                 />
               </div>
             </div>
           </div>
         ))}
       </div>
       <div className="bg-gray-50 p-3 rounded mt-4">
         <p className="text-sm font-medium">
           Total Annual Personnel: {formatCurrency(
             (futureState.cloudAdminFTE * futureState.cloudAdminSalary +
              futureState.devOpsFTE * futureState.devOpsSalary +
              futureState.securityNewFTE * futureState.securityNewSalary +
              futureState.helpdeskNewFTE * futureState.helpdeskNewSalary) * BENEFITS_MULTIPLIER, currency
           )}
         </p>
       </div>
     </Card>

     {results && (
       <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
         <h3 className="text-2xl font-bold text-green-700 mb-2">Future State 3-Year Cost</h3>
         <p className="text-4xl font-bold text-green-600">{formatCurrency(results.futureState.total, currency)}</p>
       </div>
     )}
   </div>
 );
}
EOF

# Create ROIImplementationTab component
cat > src/components/pages/ROIImplementationTab.tsx << 'EOF'
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/roiCalculations';
import { ROIFutureState } from '../../types/roi.types';

interface ROIImplementationTabProps {
 futureState: ROIFutureState;
 setFutureState: (state: ROIFutureState) => void;
 results: any;
 currency: string;
}

export function ROIImplementationTab({ 
 futureState, 
 setFutureState, 
 results, 
 currency 
}: ROIImplementationTabProps) {
 const updateField = (field: keyof ROIFutureState, value: string) => {
   setFutureState({ ...futureState, [field]: parseFloat(value) || 0 });
 };

 return (
   <div className="space-y-6">
     <Card>
       <h3 className="text-xl font-semibold mb-4">Professional Services</h3>
       <div className="grid md:grid-cols-2 gap-4">
         {[
           { label: 'Migration Services', hours: 'migrationHours', rate: 'migrationRate' },
           { label: 'Architecture Design', hours: 'archHours', rate: 'archRate' },
           { label: 'Implementation Support', hours: 'implHours', rate: 'implRate' },
           { label: 'Testing and Validation', hours: 'testHours', rate: 'testRate' },
           { label: 'Training Delivery', hours: 'trainHours', rate: 'trainRate' }
         ].map(({ label, hours, rate }) => (
           <div key={hours}>
             <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
             <div className="flex gap-2">
               <input
                 type="number"
                 value={futureState[hours as keyof ROIFutureState]}
                 onChange={(e) => updateField(hours as keyof ROIFutureState, e.target.value)}
                 className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                 placeholder="Hours"
               />
               <input
                 type="number"
                 value={futureState[rate as keyof ROIFutureState]}
                 onChange={(e) => updateField(rate as keyof ROIFutureState, e.target.value)}
                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                 placeholder="Rate/Hour"
               />
             </div>
           </div>
         ))}
       </div>
       <div className="bg-gray-50 p-3 rounded mt-4">
         <p className="text-sm font-medium">
           Total Services: {formatCurrency(
             (futureState.migrationHours * futureState.migrationRate) +
             (futureState.archHours * futureState.archRate) +
             (futureState.implHours * futureState.implRate) +
             (futureState.testHours * futureState.testRate) +
             (futureState.trainHours * futureState.trainRate), currency
           )}
         </p>
       </div>
     </Card>

     <Card>
       <h3 className="text-xl font-semibold mb-4">Internal Costs</h3>
       <div className="grid md:grid-cols-2 gap-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Internal Labor</label>
           <div className="flex gap-2">
             <input
               type="number"
               value={futureState.internalHours}
               onChange={(e) => updateField('internalHours', e.target.value)}
               className="w-24 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
               placeholder="Hours"
             />
             <input
               type="number"
               value={futureState.internalRate}
               onChange={(e) => updateField('internalRate', e.target.value)}
               className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
               placeholder="Rate/Hour"
             />
           </div>
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Travel and Expenses</label>
           <input
             type="number"
             value={futureState.travelCost}
             onChange={(e) => updateField('travelCost', e.target.value)}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
           />
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Equipment/Software</label>
           <input
             type="number"
             value={futureState.equipmentCost}
             onChange={(e) => updateField('equipmentCost', e.target.value)}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
           />
         </div>
       </div>
       <div className="bg-gray-50 p-3 rounded mt-4">
         <p className="text-sm font-medium">
           Total Internal Costs: {formatCurrency(
             (futureState.internalHours * futureState.internalRate) + 
             futureState.travelCost + futureState.equipmentCost, currency
           )}
         </p>
       </div>
     </Card>

     <Card>
       <h3 className="text-xl font-semibold mb-4">Risk Mitigation</h3>
       <div className="grid md:grid-cols-2 gap-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Contingency (10%)</label>
           <input
             type="number"
             value={(futureState.migrationHours * futureState.migrationRate +
                    futureState.archHours * futureState.archRate +
                    futureState.implHours * futureState.implRate +
                    futureState.testHours * futureState.testRate +
                    futureState.trainHours * futureState.trainRate +
                    futureState.internalHours * futureState.internalRate +
                    futureState.travelCost + futureState.equipmentCost) * 0.1}
             disabled
             className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
           />
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Parallel Operation Period</label>
           <input
             type="number"
             value={futureState.parallelCost}
             onChange={(e) => updateField('parallelCost', e.target.value)}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
           />
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Rollback Preparation</label>
           <input
             type="number"
             value={futureState.rollbackCost}
             onChange={(e) => updateField('rollbackCost', e.target.value)}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
           />
         </div>
       </div>
       <div className="bg-gray-50 p-3 rounded mt-4">
         <p className="text-sm font-medium">
           Total Risk Mitigation: {formatCurrency(
             ((futureState.migrationHours * futureState.migrationRate +
               futureState.archHours * futureState.archRate +
               futureState.implHours * futureState.implRate +
               futureState.testHours * futureState.testRate +
               futureState.trainHours * futureState.trainRate +
               futureState.internalHours * futureState.internalRate +
               futureState.travelCost + futureState.equipmentCost) * 0.1) +
             futureState.parallelCost + futureState.rollbackCost, currency
           )}
         </p>
       </div>
     </Card>

     <Card>
       <h3 className="text-xl font-semibold mb-4">Implementation Timeline</h3>
       <div className="overflow-x-auto">
         <table className="min-w-full">
           <thead>
             <tr className="border-b">
               <th className="text-left py-3 px-2">Phase</th>
               <th className="text-left py-3 px-2">Duration</th>
               <th className="text-left py-3 px-2">Key Activities</th>
             </tr>
           </thead>
           <tbody>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Planning & Design</td>
               <td className="py-3 px-2">2 weeks</td>
               <td className="py-3 px-2">Requirements gathering, architecture design, sizing</td>
             </tr>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Environment Setup</td>
               <td className="py-3 px-2">2 weeks</td>
               <td className="py-3 px-2">Azure setup, Nerdio deployment, networking</td>
             </tr>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Pilot Migration</td>
               <td className="py-3 px-2">4 weeks</td>
               <td className="py-3 px-2">Migrate test users, validate performance, refine</td>
             </tr>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Production Migration</td>
               <td className="py-3 px-2">8 weeks</td>
               <td className="py-3 px-2">Phased user migration, monitoring, optimization</td>
             </tr>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Optimization</td>
               <td className="py-3 px-2">4 weeks</td>
               <td className="py-3 px-2">Fine-tuning, training, handover</td>
             </tr>
             <tr className="bg-gray-50">
               <td className="py-3 px-2 font-medium">Total Duration</td>
               <td className="py-3 px-2 font-medium">20 weeks</td>
               <td className="py-3 px-2 font-medium">Approximately 5 months</td>
             </tr>
           </tbody>
         </table>
       </div>
     </Card>

     {results && (
       <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
         <h3 className="text-2xl font-bold text-blue-700 mb-2">Total Implementation Cost</h3>
         <p className="text-4xl font-bold text-blue-600">{formatCurrency(
           (futureState.migrationHours * futureState.migrationRate +
            futureState.archHours * futureState.archRate +
            futureState.implHours * futureState.implRate +
            futureState.testHours * futureState.testRate +
            futureState.trainHours * futureState.trainRate +
            futureState.internalHours * futureState.internalRate +
            futureState.travelCost + futureState.equipmentCost) * 1.1 +
           futureState.parallelCost + futureState.rollbackCost, currency
         )}</p>
       </div>
     )}
   </div>
 );
}
EOF

# Create ROISensitivityTab component
cat > src/components/pages/ROISensitivityTab.tsx << 'EOF'
import { Card } from '../common/Card';
import { formatCurrency, formatPercent } from '../../utils/roiCalculations';
import { ROIFutureState, ROIResults } from '../../types/roi.types';

interface ROISensitivityTabProps {
 results: ROIResults;
 futureState: ROIFutureState;
 setFutureState: (state: ROIFutureState) => void;
 currency: string;
}

export function ROISensitivityTab({ 
 results, 
 futureState, 
 setFutureState, 
 currency 
}: ROISensitivityTabProps) {
 const updateField = (field: keyof ROIFutureState, value: string) => {
   setFutureState({ ...futureState, [field]: parseFloat(value) || 0 });
 };

 return (
   <div className="space-y-6">
     <Card>
       <h3 className="text-xl font-semibold mb-4">Scenario Analysis</h3>
       <div className="overflow-x-auto">
         <table className="min-w-full">
           <thead>
             <tr className="border-b">
               <th className="text-left py-3 px-2">Scenario</th>
               <th className="text-right py-3 px-2">Probability</th>
               <th className="text-right py-3 px-2">Cost Savings</th>
               <th className="text-right py-3 px-2">NPV</th>
               <th className="text-right py-3 px-2">ROI</th>
               <th className="text-right py-3 px-2">Payback</th>
             </tr>
           </thead>
           <tbody>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Conservative</td>
               <td className="text-right py-3 px-2">25%</td>
               <td className="text-right py-3 px-2">{formatCurrency(results.sensitivity.conservative.savings, currency)}</td>
               <td className="text-right py-3 px-2">{formatCurrency(results.sensitivity.conservative.npv, currency)}</td>
               <td className="text-right py-3 px-2">{formatPercent(results.sensitivity.conservative.roi)}</td>
               <td className="text-right py-3 px-2">{Math.round(results.sensitivity.conservative.payback)} mo</td>
             </tr>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Realistic</td>
               <td className="text-right py-3 px-2">50%</td>
               <td className="text-right py-3 px-2">{formatCurrency(results.sensitivity.realistic.savings, currency)}</td>
               <td className="text-right py-3 px-2">{formatCurrency(results.sensitivity.realistic.npv, currency)}</td>
               <td className="text-right py-3 px-2">{formatPercent(results.sensitivity.realistic.roi)}</td>
               <td className="text-right py-3 px-2">{Math.round(results.sensitivity.realistic.payback)} mo</td>
             </tr>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Optimistic</td>
               <td className="text-right py-3 px-2">25%</td>
               <td className="text-right py-3 px-2">{formatCurrency(results.sensitivity.optimistic.savings, currency)}</td>
               <td className="text-right py-3 px-2">{formatCurrency(results.sensitivity.optimistic.npv, currency)}</td>
               <td className="text-right py-3 px-2">{formatPercent(results.sensitivity.optimistic.roi)}</td>
               <td className="text-right py-3 px-2">{Math.round(results.sensitivity.optimistic.payback)} mo</td>
             </tr>
           </tbody>
         </table>
       </div>
     </Card>

     <Card>
       <h3 className="text-xl font-semibold mb-4">Key Variables Impact</h3>
       <div className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Auto-scaling Efficiency</label>
           <input
             type="range"
             min="-75"
             max="-40"
             value={futureState.autoscalePercent}
             onChange={(e) => updateField('autoscalePercent', e.target.value)}
             className="w-full"
           />
           <p className="text-sm text-gray-600 mt-1">{formatPercent(futureState.autoscalePercent)} (Impact on Savings: {formatCurrency(
             ((futureState.vmD4sQty * futureState.vmD4sHours * futureState.vmD4sRate) * 12 +
              (futureState.vmD8sQty * futureState.vmD8sHours * futureState.vmD8sRate) * 12) * 
             (Math.abs(futureState.autoscalePercent) / 100), currency
           )})</p>
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">User Adoption Rate</label>
           <input
             type="range"
             min="70"
             max="100"
             value={futureState.userAdoptionRate}
             onChange={(e) => updateField('userAdoptionRate', e.target.value)}
             className="w-full"
           />
           <p className="text-sm text-gray-600 mt-1">{formatPercent(futureState.userAdoptionRate)} (Impact on Savings: {formatCurrency(
             results.savings.total * (futureState.userAdoptionRate / 100), currency
           )})</p>
         </div>
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Implementation Time</label>
           <input
             type="range"
             min="3"
             max="9"
             value={futureState.implementationTime}
             onChange={(e) => updateField('implementationTime', e.target.value)}
             className="w-full"
           />
           <p className="text-sm text-gray-600 mt-1">{futureState.implementationTime} months (Impact on Payback: {Math.round(results.paybackMonths)} mo)</p>
         </div>
       </div>
     </Card>

     <Card>
       <h3 className="text-xl font-semibold mb-4">Risk Analysis</h3>
       <div className="overflow-x-auto">
         <table className="min-w-full">
           <thead>
             <tr className="border-b">
               <th className="text-left py-3 px-2">Risk</th>
               <th className="text-left py-3 px-2">Likelihood</th>
               <th className="text-left py-3 px-2">Impact</th>
               <th className="text-left py-3 px-2">Mitigation</th>
             </tr>
           </thead>
           <tbody>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">User Resistance</td>
               <td className="py-3 px-2">Medium</td>
               <td className="py-3 px-2">Delayed adoption</td>
               <td className="py-3 px-2">Change management, training programs</td>
             </tr>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Technical Issues</td>
               <td className="py-3 px-2">Low</td>
               <td className="py-3 px-2">Downtime during migration</td>
               <td className="py-3 px-2">Pilot testing, rollback plan</td>
             </tr>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Cost Overrun</td>
               <td className="py-3 px-2">Medium</td>
               <td className="py-3 px-2">Increased implementation cost</td>
               <td className="py-3 px-2">10% contingency, fixed-price contracts</td>
             </tr>
             <tr className="border-b hover:bg-gray-50">
               <td className="py-3 px-2">Timeline Delay</td>
               <td className="py-3 px-2">Medium</td>
               <td className="py-3 px-2">Delayed savings realization</td>
               <td className="py-3 px-2">Detailed project plan, regular checkpoints</td>
             </tr>
           </tbody>
         </table>
       </div>
     </Card>
   </div>
 );
}
EOF

echo "Part 4 completed: Future State, Implementation, and Sensitivity tabs created"