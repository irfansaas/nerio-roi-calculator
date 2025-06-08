import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/roiCalculations';
import { ROICurrentState } from '../../types/roi.types';

const BENEFITS_MULTIPLIER = 1.3;

interface ROICurrentStateTabProps {
  currentState: ROICurrentState;
  setCurrentState: (state: ROICurrentState) => void;
  results: any;
  currency: string;
}

export function ROICurrentStateTab({ 
  currentState, 
  setCurrentState, 
  results, 
  currency 
}: ROICurrentStateTabProps) {
  const updateField = (field: keyof ROICurrentState, value: string) => {
    setCurrentState({ ...currentState, [field]: parseFloat(value) || 0 });
  };

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold mb-4">Infrastructure Components</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Physical Servers</label>
            <input
              type="number"
              value={currentState.physicalServers}
              onChange={(e) => updateField('physicalServers', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">3-year depreciation</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Storage Systems</label>
            <input
              type="number"
              value={currentState.storageSystems}
              onChange={(e) => updateField('storageSystems', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">SAN storage</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Network Equipment</label>
            <input
              type="number"
              value={currentState.networkEquipment}
              onChange={(e) => updateField('networkEquipment', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">5-year depreciation</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Virtualization Licenses</label>
            <input
              type="number"
              value={currentState.vdiPlatformLicensing}
              onChange={(e) => updateField('vdiPlatformLicensing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Annual license</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Datacenter Costs</label>
            <input
              type="number"
              value={currentState.datacenterCosts}
              onChange={(e) => updateField('datacenterCosts', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Annual costs</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support & Maintenance</label>
            <input
              type="number"
              value={currentState.supportMaintenance}
              onChange={(e) => updateField('supportMaintenance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Annual contracts</p>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm font-medium">Total Annual Infrastructure: {formatCurrency(
            (currentState.physicalServers / 3) + (currentState.storageSystems / 3) + (currentState.networkEquipment / 5) +
            currentState.vdiPlatformLicensing + currentState.datacenterCosts + currentState.supportMaintenance, currency
          )}</p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Operational Expenses - Personnel</h3>
        <div className="space-y-4">
          {[
            { label: 'VDI Administrators', fte: 'vdiAdminFTE', salary: 'vdiAdminSalary' },
            { label: 'Infrastructure Admins', fte: 'infraFTE', salary: 'infraSalary' },
            { label: 'Storage Admins', fte: 'storageAdminFTE', salary: 'storageAdminSalary' },
            { label: 'Network Admins', fte: 'networkAdminFTE', salary: 'networkAdminSalary' },
            { label: 'Security Staff', fte: 'securityFTE', salary: 'securitySalary' },
            { label: 'Help Desk', fte: 'helpdeskFTE', salary: 'helpdeskSalary' }
          ].map(({ label, fte, salary }) => (
            <div key={fte} className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={currentState[fte as keyof ROICurrentState]}
                    onChange={(e) => updateField(fte as keyof ROICurrentState, e.target.value)}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    step="0.5"
                    placeholder="FTE"
                  />
                  <input
                    type="number"
                    value={currentState[salary as keyof ROICurrentState]}
                    onChange={(e) => updateField(salary as keyof ROICurrentState, e.target.value)}
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
            Total Annual Personnel (with 30% benefits): {formatCurrency(
              (currentState.vdiAdminFTE * currentState.vdiAdminSalary +
               currentState.infraFTE * currentState.infraSalary +
               currentState.storageAdminFTE * currentState.storageAdminSalary +
               currentState.networkAdminFTE * currentState.networkAdminSalary +
               currentState.securityFTE * currentState.securitySalary +
               currentState.helpdeskFTE * currentState.helpdeskSalary) * BENEFITS_MULTIPLIER, currency
            )}
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold mb-4">Hidden Costs</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Cost</label>
            <input
              type="number"
              value={currentState.opportunityCost}
              onChange={(e) => updateField('opportunityCost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">40% of personnel on maintenance</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Downtime Impact</label>
            <input
              type="number"
              value={currentState.downtimeCost}
              onChange={(e) => updateField('downtimeCost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Business productivity loss</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Over-provisioning</label>
            <input
              type="number"
              value={currentState.overprovisioningCost}
              onChange={(e) => updateField('overprovisioningCost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">30% excess capacity</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Compliance Overhead</label>
            <input
              type="number"
              value={currentState.complianceCost}
              onChange={(e) => updateField('complianceCost', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Audit preparation</p>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded mt-4">
          <p className="text-sm font-medium">
            Total Hidden Costs: {formatCurrency(
              currentState.opportunityCost + currentState.downtimeCost + 
              currentState.overprovisioningCost + currentState.complianceCost, currency
            )}
          </p>
        </div>
      </Card>

      {results && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-red-700 mb-2">Current State 3-Year Cost</h3>
          <p className="text-4xl font-bold text-red-600">{formatCurrency(results.currentState.total, currency)}</p>
        </div>
      )}
    </div>
  );
}
