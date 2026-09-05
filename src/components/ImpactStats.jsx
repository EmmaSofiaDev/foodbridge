import React from 'react';
import { Utensils, Scale, CloudRain, Building2, Zap, Clock } from 'lucide-react';

export default function ImpactStats({ stats, donorCount, shelterCount }) {
  return (
    <section style={{ maxWidth: '1360px', margin: '16px auto 32px auto', padding: '0 24px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}>
        {/* Total Pounds Rescued */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            backgroundColor: '#10b981',
          }}></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
              Surplus Rescued
            </span>
            <Scale size={20} color="#10b981" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
            {stats.totalPounds.toLocaleString()} <span style={{ fontSize: '1rem', color: '#6ee7b7', fontWeight: '500' }}>lbs</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
            100% diverted from municipal landfill
          </div>
        </div>

        {/* Nutritious Meals Created */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            backgroundColor: '#38bdf8',
          }}></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
              Meals Provided
            </span>
            <Utensils size={20} color="#38bdf8" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
            {stats.totalMeals.toLocaleString()} <span style={{ fontSize: '1rem', color: '#7dd3fc', fontWeight: '500' }}>meals</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
            1.25 meals per lb (USDA standard)
          </div>
        </div>

        {/* CO2 Emissions Mitigated */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            backgroundColor: '#f59e0b',
          }}></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
              GHG Carbon Offset
            </span>
            <CloudRain size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
            {stats.totalCo2MetricTons} <span style={{ fontSize: '1rem', color: '#fcd34d', fontWeight: '500' }}>MT CO₂e</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
            Calculated via EPA WARM Model SQL View
          </div>
        </div>

        {/* Active Node Network */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            backgroundColor: '#a855f7',
          }}></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
              Active Grid Nodes
            </span>
            <Building2 size={20} color="#a855f7" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
            {donorCount} <span style={{ fontSize: '0.9rem', color: '#d8b4fe', fontWeight: '500' }}>Donors</span> / {shelterCount} <span style={{ fontSize: '0.9rem', color: '#d8b4fe', fontWeight: '500' }}>Shelters</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
            100% verified non-profit routing
          </div>
        </div>
      </div>
    </section>
  );
}
