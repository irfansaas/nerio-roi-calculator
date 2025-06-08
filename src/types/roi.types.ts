export interface ROICurrentState {
  physicalServers: number;
  storageSystems: number;
  networkEquipment: number;
  datacenterCosts: number;
  vdiPlatformLicensing: number;
  supportMaintenance: number;
  vdiAdminFTE: number;
  vdiAdminSalary: number;
  infraFTE: number;
  infraSalary: number;
  storageAdminFTE: number;
  storageAdminSalary: number;
  networkAdminFTE: number;
  networkAdminSalary: number;
  securityFTE: number;
  securitySalary: number;
  helpdeskFTE: number;
  helpdeskSalary: number;
  opportunityCost: number;
  downtimeCost: number;
  overprovisioningCost: number;
  complianceCost: number;
}

export interface ROIFutureState {
  vmD4sQty: number;
  vmD4sHours: number;
  vmD4sRate: number;
  vmD8sQty: number;
  vmD8sHours: number;
  vmD8sRate: number;
  autoscalePercent: number;
  riPercent: number;
  premiumTB: number;
  premiumRate: number;
  standardTB: number;
  standardRate: number;
  diskSwapPercent: number;
  nerdioCostPerUser: number;
  m365CostPerUser: number;
  cloudAdminFTE: number;
  cloudAdminSalary: number;
  devOpsFTE: number;
  devOpsSalary: number;
  securityNewFTE: number;
  securityNewSalary: number;
  helpdeskNewFTE: number;
  helpdeskNewSalary: number;
  migrationHours: number;
  migrationRate: number;
  archHours: number;
  archRate: number;
  implHours: number;
  implRate: number;
  testHours: number;
  testRate: number;
  trainHours: number;
  trainRate: number;
  internalHours: number;
  internalRate: number;
  travelCost: number;
  equipmentCost: number;
  parallelCost: number;
  rollbackCost: number;
  userAdoptionRate: number;
  implementationTime: number;
}

export interface ROIResults {
  currentState: {
    year1: number;
    year2: number;
    year3: number;
    total: number;
  };
  futureState: {
    year1: number;
    year2: number;
    year3: number;
    total: number;
  };
  savings: {
    year1: number;
    year2: number;
    year3: number;
    total: number;
    percentage: number;
    monthly: number;
  };
  perUser: {
    currentMonthly: number;
    futureMonthly: number;
    savingsMonthly: number;
  };
  paybackMonths: number;
  npv: number;
  roi: number;
  sensitivity: {
    conservative: {
      savings: number;
      npv: number;
      roi: number;
      payback: number;
    };
    realistic: {
      savings: number;
      npv: number;
      roi: number;
      payback: number;
    };
    optimistic: {
      savings: number;
      npv: number;
      roi: number;
      payback: number;
    };
  };
}
