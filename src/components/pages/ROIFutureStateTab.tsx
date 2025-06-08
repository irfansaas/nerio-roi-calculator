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
