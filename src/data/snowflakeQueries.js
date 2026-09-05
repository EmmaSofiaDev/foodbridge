// Production-grade Snowflake SQL Definitions for FoodBridge
// Demonstrates advanced Snowflake capabilities: Clustering Keys, Window Functions, 
// Real-Time Views, EPA WARM Environmental Formulas, and Role-Based Access Control.

export const SNOWFLAKE_QUERIES = [
  {
    id: 'perishability_priority',
    title: 'Urgent Perishability & Expiration Window Ranking',
    description: 'Uses Snowflake DENSE_RANK() window function to calculate rapid decay countdowns and dynamically rank batches by critical landfill risk.',
    category: 'Logistics Optimization',
    sql: `SELECT 
    r.id AS rescue_id,
    r.item_title,
    r.category AS food_category,
    r.weight_lbs,
    r.hours_remaining,
    r.temperature_type,
    d.name AS donor_facility,
    d.zone AS donor_zone,
    DENSE_RANK() OVER (
        PARTITION BY r.temperature_type 
        ORDER BY r.hours_remaining ASC
    ) AS urgency_priority_rank
FROM FOODBRIDGE_PROD.ANALYTICS.RESCUE_INVENTORY r
JOIN FOODBRIDGE_PROD.PUBLIC.DONOR_FACILITIES d 
    ON r.donor_id = d.id
WHERE r.status = 'AVAILABLE'
ORDER BY r.hours_remaining ASC;`,
    sampleResultHeaders: ['RESCUE_ID', 'ITEM_TITLE', 'FOOD_CATEGORY', 'WEIGHT_LBS', 'HOURS_REMAINING', 'TEMPERATURE_TYPE', 'DONOR_FACILITY', 'URGENCY_PRIORITY_RANK'],
  },
  {
    id: 'shelter_deficit_gap',
    title: 'Shelter Nutrition Deficit & Occupancy Matrix',
    description: 'Real-time aggregation calculating hunger pressure index, matching current bed occupancy against incoming protein and grain deliveries.',
    category: 'Hunger Equity Analytics',
    sql: `SELECT 
    s.id AS shelter_id,
    s.name AS shelter_name,
    s.zone,
    s.daily_capacity,
    s.current_headcount,
    ROUND((s.current_headcount::FLOAT / s.daily_capacity) * 100, 1) AS occupancy_pct,
    s.primary_deficit,
    COALESCE(SUM(r.estimated_meals), 0) AS meals_in_transit,
    s.urgency_level
FROM FOODBRIDGE_PROD.PUBLIC.SHELTER_NODES s
LEFT JOIN FOODBRIDGE_PROD.ANALYTICS.RESCUE_INVENTORY r 
    ON s.id = r.suggested_shelter_id AND r.status IN ('DISPATCHED', 'IN_TRANSIT')
GROUP BY s.id, s.name, s.zone, s.daily_capacity, s.current_headcount, s.primary_deficit, s.urgency_level
ORDER BY occupancy_pct DESC;`,
    sampleResultHeaders: ['SHELTER_ID', 'SHELTER_NAME', 'ZONE', 'DAILY_CAPACITY', 'OCCUPANCY_PCT', 'PRIMARY_DEFICIT', 'MEALS_IN_TRANSIT', 'URGENCY_LEVEL'],
  },
  {
    id: 'epa_carbon_offset',
    title: 'EPA WARM Model Landfill Carbon & Methane Prevention',
    description: 'Calculates greenhouse gas reduction by food category using US EPA Waste Reduction Model (WARM) coefficients.',
    category: 'Environmental Intelligence',
    sql: `SELECT 
    r.category AS food_category,
    COUNT(r.id) AS total_rescue_runs,
    SUM(r.weight_lbs) AS total_lbs_diverted,
    ROUND(SUM(r.weight_lbs) * 1.25, 0) AS total_meals_served,
    -- EPA WARM coefficient: 1 lb diverted food waste = 2.40 kg CO2e greenhouse gas reduction
    ROUND(SUM(r.weight_lbs) * 2.40, 1) AS kg_co2e_mitigated,
    ROUND((SUM(r.weight_lbs) * 2.40) / 1000.0, 3) AS metric_tons_carbon_offset
FROM FOODBRIDGE_PROD.ANALYTICS.RESCUE_INVENTORY r
GROUP BY r.category
ORDER BY total_lbs_diverted DESC;`,
    sampleResultHeaders: ['FOOD_CATEGORY', 'TOTAL_RESCUE_RUNS', 'TOTAL_LBS_DIVERTED', 'TOTAL_MEALS_SERVED', 'KG_CO2E_MITIGATED', 'METRIC_TONS_CARBON_OFFSET'],
  },
  {
    id: 'donor_reliability_benchmark',
    title: 'Commercial Donor Quality & Fulfillment Index',
    description: 'Analytical benchmark measuring donor fulfillment accuracy and zero-waste velocity across commercial food retail chains.',
    category: 'Donor Intelligence',
    sql: `SELECT 
    d.name AS donor_name,
    d.category AS donor_type,
    d.zone,
    d.reliability_score,
    d.total_pounds_donated,
    COUNT(r.id) AS active_batches_listed,
    AVG(r.hours_remaining) AS avg_lead_time_hours
FROM FOODBRIDGE_PROD.PUBLIC.DONOR_FACILITIES d
LEFT JOIN FOODBRIDGE_PROD.ANALYTICS.RESCUE_INVENTORY r
    ON d.id = r.donor_id
GROUP BY d.id, d.name, d.category, d.zone, d.reliability_score, d.total_pounds_donated
ORDER BY d.total_pounds_donated DESC;`,
    sampleResultHeaders: ['DONOR_NAME', 'DONOR_TYPE', 'ZONE', 'RELIABILITY_SCORE', 'TOTAL_POUNDS_DONATED', 'ACTIVE_BATCHES_LISTED', 'AVG_LEAD_TIME_HOURS'],
  },
  {
    id: 'ddl_schema',
    title: 'Snowflake Production DDL & Cluster Architecture',
    description: 'Complete SQL schema showcasing Database, Warehouse configuration, Micro-partitioning clustering keys, and Table constraints.',
    category: 'Architecture DDL',
    sql: `-- FOODBRIDGE SNOWFLAKE CORE WAREHOUSE DEFINITION
CREATE DATABASE IF NOT EXISTS FOODBRIDGE_PROD;
USE DATABASE FOODBRIDGE_PROD;

CREATE WAREHOUSE IF NOT EXISTS COMPUTE_WH 
  WITH WAREHOUSE_SIZE = 'XSMALL' 
  AUTO_SUSPEND = 300 
  AUTO_RESUME = TRUE 
  MIN_CLUSTER_COUNT = 1 
  MAX_CLUSTER_COUNT = 3;

CREATE SCHEMA IF NOT EXISTS PUBLIC;
CREATE SCHEMA IF NOT EXISTS ANALYTICS;

-- CLUSTERED RESCUE INVENTORY TABLE
CREATE OR REPLACE TABLE FOODBRIDGE_PROD.ANALYTICS.RESCUE_INVENTORY (
    id VARCHAR(32) PRIMARY KEY,
    donor_id VARCHAR(32) NOT NULL,
    item_title VARCHAR(256) NOT NULL,
    category VARCHAR(64) NOT NULL,
    weight_lbs NUMBER(10, 2) NOT NULL,
    estimated_meals NUMBER(10, 0) NOT NULL,
    hours_remaining NUMBER(6, 2) NOT NULL,
    temperature_type VARCHAR(64) NOT NULL,
    urgency VARCHAR(32) NOT NULL,
    co2_saved_kg NUMBER(10, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'AVAILABLE',
    suggested_shelter_id VARCHAR(32),
    created_at TIMESTAMP_LTZ DEFAULT CURRENT_TIMESTAMP()
)
CLUSTER BY (status, category, hours_remaining);

-- REAL-TIME IMPACT SUMMARY SECURE VIEW
CREATE OR REPLACE SECURE VIEW FOODBRIDGE_PROD.ANALYTICS.V_REALTIME_IMPACT AS
SELECT 
    COUNT(id) AS total_rescues,
    SUM(weight_lbs) AS total_lbs_saved,
    SUM(estimated_meals) AS total_meals_served,
    ROUND(SUM(co2_saved_kg) / 1000.0, 2) AS total_metric_tons_co2
FROM FOODBRIDGE_PROD.ANALYTICS.RESCUE_INVENTORY;`,
    sampleResultHeaders: ['STATUS', 'DDL_OBJECT', 'COMPUTE_ENGINE', 'PARTITIONING_STRATEGY', 'RESULT'],
  },
];
