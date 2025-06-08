import { ROICurrentState, ROIFutureState, ROIResults } from '../types/roi.types';

const BENEFITS_MULTIPLIER = 1.3; // 30% benefits
const ANNUAL_GROWTH = 0.03; // 3% personnel growth
const CLOUD_GROWTH = 0.05; // 5% cloud cost growth
const DISCOUNT_RATE = 0.08; // 8% NPV discount rate

export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercent = (value: number): string => `${Math.round(value)}%`;

export const calculateROI = (
  currentState: ROICurrentState,
  futureState: ROIFutureState,
  userCount: number,
  currency: string
): ROIResults => {
  // Current State Calculations
  const serversAnnual = currentState.physicalServers / 3;
  const storageAnnual = currentState.storageSystems / 3;
  const networkAnnual = currentState.networkEquipment / 5;
  const infraTotal = serversAnnual + storageAnnual + networkAnnual + 
    currentState.vdiPlatformLicensing + currentState.datacenterCosts;

  const personnelRoles = ['vdiAdmin', 'infra', 'storageAdmin', 'networkAdmin', 'security', 'helpdesk'];
  let personnelTotal = 0;
  personnelRoles.forEach(role => {
    const fte = (currentState as any)[`${role}FTE`] || 0;
    const salary = (currentState as any)[`${role}Salary`] || 0;
    personnelTotal += fte * salary * BENEFITS_MULTIPLIER;
  });

  const opportunityCost = personnelTotal * 0.4;
  const overprovisioningCost = infraTotal * 0.3;
  const hiddenTotal = opportunityCost + currentState.downtimeCost + 
    overprovisioningCost + currentState.complianceCost;

  const currentY1 = infraTotal + personnelTotal + hiddenTotal;
  const currentY2 = (infraTotal + personnelTotal) * (1 + ANNUAL_GROWTH) + hiddenTotal;
  const currentY3 = (infraTotal + personnelTotal) * Math.pow(1 + ANNUAL_GROWTH, 2) + hiddenTotal;
  const currentTotal = currentY1 + currentY2 + currentY3;

  // Future State Calculations
  const d4sAnnual = (futureState.vmD4sQty * futureState.vmD4sHours * futureState.vmD4sRate) * 12;
  const d8sAnnual = (futureState.vmD8sQty * futureState.vmD8sHours * futureState.vmD8sRate) * 12;
  const baseCompute = d4sAnnual + d8sAnnual;
  const autoscaleSavings = baseCompute * (futureState.autoscalePercent / 100);
  const computeAfterAutoscale = baseCompute + autoscaleSavings;
  const riSavings = computeAfterAutoscale * (futureState.riPercent / 100);
  const computeTotal = computeAfterAutoscale + riSavings;

  const premiumAnnual = (futureState.premiumTB * futureState.premiumRate) * 12;
  const standardAnnual = (futureState.standardTB * futureState.standardRate) * 12;
  const baseStorage = premiumAnnual + standardAnnual;
  const diskSwapSavings = baseStorage * (futureState.diskSwapPercent / 100);
  const storageTotal = baseStorage + diskSwapSavings;

  const nerdioAnnual = userCount * futureState.nerdioCostPerUser * 12;
  const m365Annual = userCount * futureState.m365CostPerUser * 12;
  const licensingTotal = nerdioAnnual + m365Annual;

  const futureRoles = ['cloudAdmin', 'devOps', 'securityNew', 'helpdeskNew'];
  let personnelTotalFuture = 0;
  futureRoles.forEach(role => {
    const fte = (futureState as any)[`${role}FTE`] || 0;
    const salary = (futureState as any)[`${role}Salary`] || 0;
    personnelTotalFuture += fte * salary * BENEFITS_MULTIPLIER;
  });

  const servicesTotal = (futureState.migrationHours * futureState.migrationRate) +
    (futureState.archHours * futureState.archRate) +
    (futureState.implHours * futureState.implRate) +
    (futureState.testHours * futureState.testRate) +
    (futureState.trainHours * futureState.trainRate);
  const internalTotal = (futureState.internalHours * futureState.internalRate) +
    futureState.travelCost + futureState.equipmentCost;
  const contingency = (servicesTotal + internalTotal) * 0.1;
  const riskTotal = contingency + futureState.parallelCost + futureState.rollbackCost;
  const implementationTotal = servicesTotal + internalTotal + riskTotal;

  const futureY1 = computeTotal + storageTotal + licensingTotal + personnelTotalFuture + implementationTotal;
  const futureY2 = (computeTotal + storageTotal + licensingTotal) * (1 + CLOUD_GROWTH) + 
    personnelTotalFuture * (1 + ANNUAL_GROWTH);
  const futureY3 = (computeTotal + storageTotal + licensingTotal) * Math.pow(1 + CLOUD_GROWTH, 2) + 
    personnelTotalFuture * Math.pow(1 + ANNUAL_GROWTH, 2);
  const futureTotal = futureY1 + futureY2 + futureY3;

  // Savings (adjusted by user adoption rate)
  const adoptionFactor = futureState.userAdoptionRate / 100;
  const savingsY1 = (currentY1 - futureY1) * adoptionFactor;
  const savingsY2 = (currentY2 - futureY2) * adoptionFactor;
  const savingsY3 = (currentY3 - futureY3) * adoptionFactor;
  const savingsTotal = savingsY1 + savingsY2 + savingsY3;
  const savingsPercentage = (savingsTotal / currentTotal) * 100;
  const monthlySavings = savingsTotal / 36;

  // Per User
  const currentPerUserMonthly = (currentTotal / 36) / userCount;
  const futurePerUserMonthly = (futureTotal / 36) / userCount;
  const savingsPerUserMonthly = currentPerUserMonthly - futurePerUserMonthly;

  // Financial Metrics (adjusted by implementation time)
  const paybackMonths = (implementationTotal / monthlySavings) * (futureState.implementationTime / 5);
  const npv = (savingsY1 / Math.pow(1 + DISCOUNT_RATE, 1)) +
    (savingsY2 / Math.pow(1 + DISCOUNT_RATE, 2)) +
    (savingsY3 / Math.pow(1 + DISCOUNT_RATE, 3)) -
    implementationTotal;
  const roi = ((npv + implementationTotal) / implementationTotal) * 100;

  // Sensitivity Analysis
  const conservativeSavings = savingsTotal * 0.8;
  const conservativeNPV = (conservativeSavings / 3 / Math.pow(1 + DISCOUNT_RATE, 1)) +
    (conservativeSavings / 3 / Math.pow(1 + DISCOUNT_RATE, 2)) +
    (conservativeSavings / 3 / Math.pow(1 + DISCOUNT_RATE, 3)) -
    implementationTotal;
  const conservativeROI = ((conservativeNPV + implementationTotal) / implementationTotal) * 100;
  const conservativePayback = implementationTotal / (conservativeSavings / 36);

  const optimisticSavings = savingsTotal * 1.2;
  const optimisticNPV = (optimisticSavings / 3 / Math.pow(1 + DISCOUNT_RATE, 1)) +
    (optimisticSavings / 3 / Math.pow(1 + DISCOUNT_RATE, 2)) +
    (optimisticSavings / 3 / Math.pow(1 + DISCOUNT_RATE, 3)) -
    implementationTotal;
  const optimisticROI = ((optimisticNPV + implementationTotal) / implementationTotal) * 100;
  const optimisticPayback = implementationTotal / (optimisticSavings / 36);

  return {
    currentState: { year1: currentY1, year2: currentY2, year3: currentY3, total: currentTotal },
    futureState: { year1: futureY1, year2: futureY2, year3: futureY3, total: futureTotal },
    savings: { 
      year1: savingsY1, 
      year2: savingsY2, 
      year3: savingsY3, 
      total: savingsTotal, 
      percentage: savingsPercentage, 
      monthly: monthlySavings 
    },
    perUser: { 
      currentMonthly: currentPerUserMonthly, 
      futureMonthly: futurePerUserMonthly, 
      savingsMonthly: savingsPerUserMonthly 
    },
    paybackMonths,
    npv,
    roi,
    sensitivity: {
      conservative: { 
        savings: conservativeSavings, 
        npv: conservativeNPV, 
        roi: conservativeROI, 
        payback: conservativePayback 
      },
      realistic: { 
        savings: savingsTotal, 
        npv, 
        roi, 
        payback: paybackMonths 
      },
      optimistic: { 
        savings: optimisticSavings, 
        npv: optimisticNPV, 
        roi: optimisticROI, 
        payback: optimisticPayback 
      }
    }
  };
};
