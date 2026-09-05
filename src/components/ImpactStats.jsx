import React from 'react';
import { Utensils, Scale, CloudRain, Building2, Zap, Clock } from 'lucide-react';

export default function ImpactStats({ stats, donorCount, shelterCount }) {
  return (
    <section style={{ maxWidth: '1360px', margin: '0 auto 54px auto', padding: '0 24px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
      }}>
        {/* Total Pounds Rescued */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
              Surplus Rescued
            </span>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Scale size={20} color="#10b981" />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1' }}>
            {stats.totalPounds.toLocaleString()} <span style={{ fontSize: '1rem', color: '#6ee7b7', fontWeight: '600' }}>lbs</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>
            100% diverted from municipal landfill
          </div>
        </div>

        {/* Nutritious Meals Created */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
              Meals Delivered
            </span>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(2, 132, 199, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Utensils size={20} color="#38bdf8" />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1' }}>
            {stats.totalMeals.toLocaleString()} <span style={{ fontSize: '1rem', color: '#7dd3fc', fontWeight: '600' }}>meals</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>
            Calculated at 1.25 meals/lb (USDA standard)
          </div>
        </div>

        {/* CO2 Emissions Mitigated */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
              GHG Carbon Offset
            </span>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CloudRain size={20} color="#f59e0b" />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1' }}>
            {stats.totalCo2MetricTons} <span style={{ fontSize: '1rem', color: '#fcd34d', fontWeight: '600' }}>MT CO₂e</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>
            Audited via EPA WARM Analytical Model
          </div>
        </div>

        {/* Active Node Network */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
              Connected Logistics Grid
            </span>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(168, 85, 247, 0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Building2 size={20} color="#c084fc" />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em', lineHeight: '1' }}>
            {donorCount} <span style={{ fontSize: '1rem', color: '#d8b4fe', fontWeight: '600' }}>Donors</span> • {shelterCount} <span style={{ fontSize: '1rem', color: '#d8b4fe', fontWeight: '600' }}>Shelters</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>
            Live verified non-profit routing network
          </div>
        </div>
      </div>
    </section>
  );
}
