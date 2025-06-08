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
