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
