import React, { useState } from 'react';
import { Clock, Truck, CheckCircle2, AlertTriangle, Thermometer, MapPin, Building, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RescueGrid({ batches, onDispatchBatch }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Fresh Produce', 'Artisan Bakery', 'Prepared Hot Meals', 'Chilled Dairy & Eggs'];

  const filteredBatches = selectedCategory === 'ALL'
    ? batches
    : batches.filter((b) => b.category === selectedCategory);

  const handleDispatch = (batch) => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#10b981', '#0284c7', '#38bdf8', '#34d399'],
    });
    onDispatchBatch(batch.id);
  };

  return (
    <section style={{ maxWidth: '1360px', margin: '0 auto 48px auto', padding: '0 24px' }}>
      {/* Section Header & Filters */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>
              Live Surplus Food Inventory
            </h2>
            <span style={{
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '2px 8px',
              borderRadius: '9999px',
            }}>
              {batches.filter(b => b.status === 'AVAILABLE').length} Active Batches
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
            Directly synced from commercial retail registers with dynamic Snowflake decay rankings.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? '#10b981' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#ffffff' : '#cbd5e1',
                border: selectedCategory === cat ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat === 'ALL' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Food Batches */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '20px',
      }}>
        {filteredBatches.map((batch) => {
          const isAvailable = batch.status === 'AVAILABLE';
          const isUrgent = batch.hoursRemaining <= 3.5;

          return (
            <div
              key={batch.id}
              className={isAvailable ? "glass-panel" : "glass-panel"}
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                opacity: isAvailable ? 1 : 0.65,
                borderColor: isAvailable && isUrgent ? 'rgba(244, 63, 94, 0.4)' : undefined,
              }}
            >
              <div>
                {/* Header row: ID, Urgency & Category */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748b' }}>
                    {batch.id}
                  </span>
                  
                  {isAvailable ? (
                    <span className={batch.urgency === 'CRITICAL' ? 'badge-critical' : batch.urgency === 'HIGH' ? 'badge-high' : 'badge-medium'}>
                      <Clock size={12} />
                      {batch.hoursRemaining.toFixed(1)}h remaining
                    </span>
                  ) : (
                    <span style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#34d399',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <CheckCircle2 size={12} /> DISPATCHED
                    </span>
                  )}
                </div>

                {/* Item Title */}
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', lineHeight: '1.4', marginBottom: '10px' }}>
                  {batch.itemTitle}
                </h3>

                {/* Donor & Facility Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '14px' }}>
                  <Building size={14} color="#64748b" />
                  <span>{batch.donorName}</span>
                </div>

                {/* Stats row: Weight, Meals & Temperature */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  marginBottom: '16px',
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Weight</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#f8fafc' }}>{batch.weightLbs} lbs</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Yield</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#38bdf8' }}>{batch.estimatedMeals} meals</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>CO₂ Averted</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#34d399' }}>{batch.co2SavedKg} kg</div>
                  </div>
                </div>

                {/* Recommended Shelter Match */}
                <div style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: 'rgba(2, 132, 199, 0.08)',
                  border: '1px solid rgba(2, 132, 199, 0.2)',
                  fontSize: '0.78rem',
                  color: '#cbd5e1',
                  marginBottom: '18px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: '600', marginBottom: '3px' }}>
                    <MapPin size={13} />
                    <span>Auto-Matched Shelter Deficit:</span>
                  </div>
                  <div style={{ fontWeight: '600', color: '#ffffff' }}>
                    {batch.suggestedShelterName}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Fulfills: {batch.targetDeficitCategory}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {isAvailable ? (
                <button
                  onClick={() => handleDispatch(batch)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                >
                  <Truck size={16} />
                  <span>Dispatch Volunteer Courier</span>
                </button>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '9px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  color: '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}>
                  <CheckCircle2 size={15} color="#10b981" /> Courier En Route to Shelter
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
