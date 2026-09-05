import React from 'react';
import { Home, Users, AlertCircle, CheckCircle2, Snowflake, MapPin } from 'lucide-react';

export default function ShelterDirectory({ shelters }) {
  return (
    <section style={{ maxWidth: '1360px', margin: '0 auto 60px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>
          Verified Community Shelters & Food Pantries
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
          Real-time demand signals and storage readiness across our non-profit hunger relief network.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
      }}>
        {shelters.map((shelter) => {
          const occupancyPct = Math.round((shelter.currentHeadcount / shelter.dailyCapacity) * 100);

          return (
            <div key={shelter.id} className="glass-panel" style={{ padding: '22px' }}>
              {/* Header: ID, Urgency & Name */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748b' }}>
                  {shelter.id}
                </span>
                <span className={shelter.urgencyLevel === 'CRITICAL' ? 'badge-critical' : 'badge-high'}>
                  <AlertCircle size={12} />
                  {shelter.urgencyLevel} NEED
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>
                {shelter.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '16px' }}>
                <MapPin size={14} color="#64748b" />
                <span>{shelter.address} ({shelter.zone})</span>
              </div>

              {/* Occupancy Progress Bar */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  <span>Daily Meal Capacity:</span>
                  <strong>{shelter.currentHeadcount} / {shelter.dailyCapacity} ({occupancyPct}%)</strong>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${occupancyPct}%`,
                    height: '100%',
                    backgroundColor: occupancyPct > 90 ? '#f43f5e' : '#10b981',
                    borderRadius: '9999px',
                  }}></div>
                </div>
              </div>

              {/* Nutritional Deficit Alert */}
              <div style={{
                background: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.25)',
                borderRadius: '8px',
                padding: '10px 12px',
                marginBottom: '14px',
              }}>
                <div style={{ fontSize: '0.7rem', color: '#fda4af', fontWeight: '700', textTransform: 'uppercase' }}>
                  Primary Nutritional Deficit:
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff', marginTop: '2px' }}>
                  {shelter.primaryDeficit}
                </div>
              </div>

              {/* Facility Readiness specs */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '0.76rem',
                color: '#94a3b8',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Snowflake size={14} color={shelter.refrigerationReady ? '#38bdf8' : '#64748b'} />
                  <span>{shelter.refrigerationReady ? 'Cold Storage Ready' : 'Dry Storage Only'}</span>
                </div>
                <div>
                  <strong>{shelter.totalMealsReceived.toLocaleString()}</strong> lifetime meals
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
