// Snowflake Client & In-Memory Analytical Execution Engine for FoodBridge
// Simulates sub-second Snowflake Data Warehouse querying with realistic query telemetry:
// Execution plans, partition pruning, query IDs, and byte throughput.

import { SNOWFLAKE_METADATA } from '../data/mockSnowflakeData';

export function generateQueryId() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `01b${s4()}-${s4()}-40f8-9a${s4()}-${s4()}${s4()}`;
}

export async function executeSnowflakeQuery(queryDefId, batches, shelters, donors) {
  // Simulate cloud round-trip latency (110ms - 220ms)
  const latency = Math.floor(Math.random() * 110) + 115;
  await new Promise((resolve) => setTimeout(resolve, latency));

  const queryId = generateQueryId();
  let rows = [];

  switch (queryDefId) {
    case 'perishability_priority':
      rows = batches
        .filter((b) => b.status === 'AVAILABLE')
        .sort((a, b) => a.hoursRemaining - b.hoursRemaining)
        .map((b, idx) => [
          b.id,
          b.itemTitle,
          b.category,
          `${b.weightLbs} lbs`,
          `${b.hoursRemaining.toFixed(1)} hrs`,
          b.temperatureType,
          b.donorName,
          idx + 1,
        ]);
      break;

    case 'shelter_deficit_gap':
      rows = shelters.map((s) => {
        const incoming = batches
          .filter((b) => b.suggestedShelterId === s.id && b.status !== 'AVAILABLE')
          .reduce((sum, b) => sum + b.estimatedMeals, 0);
        const occupancy = ((s.currentHeadcount / s.dailyCapacity) * 100).toFixed(1);
        return [
          s.id,
          s.name,
          s.zone,
          s.dailyCapacity,
          `${occupancy}%`,
          s.primaryDeficit,
          incoming,
          s.urgencyLevel,
        ];
      });
      break;

    case 'epa_carbon_offset': {
      const categoryMap = {};
      batches.forEach((b) => {
        if (!categoryMap[b.category]) {
          categoryMap[b.category] = { runs: 0, weight: 0 };
        }
        categoryMap[b.category].runs += 1;
        categoryMap[b.category].weight += b.weightLbs;
      });
      rows = Object.entries(categoryMap).map(([category, stats]) => {
        const meals = Math.round(stats.weight * 1.25);
        const kgCo2 = (stats.weight * 2.4).toFixed(1);
        const metricTons = ((stats.weight * 2.4) / 1000).toFixed(3);
        return [category, stats.runs, `${stats.weight} lbs`, meals, `${kgCo2} kg`, `${metricTons} MT`];
      });
      break;
    }

    case 'donor_reliability_benchmark':
      rows = donors.map((d) => {
        const activeListings = batches.filter((b) => b.donorId === d.id && b.status === 'AVAILABLE').length;
        return [
          d.name,
          d.category,
          d.zone,
          `${d.reliabilityScore}%`,
          `${d.totalPoundsDonated.toLocaleString()} lbs`,
          activeListings,
          '6.4 hrs',
        ];
      });
      break;

    case 'ddl_schema':
    default:
      rows = [
        ['COMPILED_SUCCESS', 'DATABASE: FOODBRIDGE_PROD', 'AWS_US_EAST_1', 'MICRO_PARTITION_PRUNING', 'OK (0.04s)'],
        ['COMPILED_SUCCESS', 'WAREHOUSE: COMPUTE_WH', 'STANDARD_XSMALL', 'AUTO_SUSPEND: 300s', 'OK (0.02s)'],
        ['COMPILED_SUCCESS', 'TABLE: RESCUE_INVENTORY', 'SNOWFLAKE_COLUMNAR', 'CLUSTER_BY(status, category)', 'OK (0.07s)'],
        ['COMPILED_SUCCESS', 'VIEW: V_REALTIME_IMPACT', 'SECURE_VIEW', 'REAL_TIME_MATERIALIZED', 'OK (0.01s)'],
      ];
      break;
  }

  return {
    queryId,
    warehouse: SNOWFLAKE_METADATA.warehouse,
    database: SNOWFLAKE_METADATA.database,
    schema: SNOWFLAKE_METADATA.schema,
    executionTimeMs: latency,
    bytesScanned: `${(rows.length * 1.84 + 12.4).toFixed(1)} KB`,
    partitionsTotal: 4,
    partitionsScanned: 1, // Shows Snowflake micro-partition pruning!
    rowCount: rows.length,
    rows,
    executedAt: new Date().toLocaleTimeString(),
  };
}

export function calculateGlobalMetrics(batches) {
  const totalPounds = batches.reduce((sum, b) => sum + b.weightLbs, 0);
  const totalMeals = batches.reduce((sum, b) => sum + b.estimatedMeals, 0);
  const totalCo2Kg = batches.reduce((sum, b) => sum + b.co2SavedKg, 0);
  const availableCount = batches.filter((b) => b.status === 'AVAILABLE').length;
  const rescuedCount = batches.filter((b) => b.status === 'DISPATCHED' || b.status === 'DELIVERED').length;

  return {
    totalPounds,
    totalMeals,
    totalCo2MetricTons: (totalCo2Kg / 1000).toFixed(2),
    availableCount,
    rescuedCount,
  };
}
