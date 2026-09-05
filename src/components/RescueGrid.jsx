import React, { useState } from 'react';
import { Clock, Truck, CheckCircle2, AlertTriangle, Thermometer, MapPin, Building, ArrowUpRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RescueGrid({ batches, onDispatchBatch }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Fresh Produce', 'Artisan Bakery', 'Prepared Hot Meals', 'Chilled Dairy & Eggs'];

  const filteredBatches = selectedCategory === 'ALL'
    ? batches
    : batches.filter((b) => b.category === selectedCategory);

  const handleDispatch = (batch) => {
    confetti({
      particleCount: 75,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#10b981', '#0284c7', '#38bdf8', '#34d399', '#f59e0b'],
    });
    onDispatchBatch(batch.id);
  };

  return (
    <section style={{ maxWidth: '1360px', margin: '0 auto 64px auto', padding: '0 24px' }}>
      {/* Section Header & Filters */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '28px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
              Active Surplus Food Grid
            </h2>
            <span className="badge-status badge-success">
              <Sparkles size={12} />
              {batches.filter(b => b.status === 'AVAILABLE').length} Batches Ready
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '4px' }}>
            Ranked by Snowflake dynamic decay window formulas (<code style={{ color: '#38bdf8' }}>DENSE_RANK()</code>).
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#ffffff' : '#94a3b8',
                border: selectedCategory === cat ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCategory === cat ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'none',
              }}
            >
              {cat === 'ALL' ? 'All Surplus' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Food Batches */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '24px',
      }}>
        {filteredBatches.map((batch) => {
          const isAvailable = batch.status === 'AVAILABLE';
          const isUrgent = batch.hoursRemaining <= 3.5;
          const decayPct = Math.min(100, Math.round((batch.hoursRemaining / 12) * 100));

          return (
            <div
              key={batch.id}
              className="glass-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                opacity: isAvailable ? 1 : 0.72,
                border: isAvailable && isUrgent ? '1px solid rgba(244, 63, 94, 0.4)' : undefined,
              }}
            >
              <div>
                {/* Header row: ID, Urgency & Category */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>
                    {batch.id}
                  </span>
                  
                  {isAvailable ? (
                    <span className={batch.urgency === 'CRITICAL' ? 'badge-status badge-critical' : batch.urgency === 'HIGH' ? 'badge-status badge-high' : 'badge-status badge-medium'}>
                      <Clock size={12} />
                      {batch.hoursRemaining.toFixed(1)}h until spoilage
                    </span>
                  ) : (
                    <span className="badge-status badge-success">
                      <CheckCircle2 size={12} /> DISPATCHED
                    </span>
                  )}
                </div>

                {/* Spoilage Decay Progress Bar */}
                {isAvailable && (
                  <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: '9999px', marginBottom: '16px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${decayPct}%`,
                      height: '100%',
                      backgroundColor: batch.urgency === 'CRITICAL' ? '#f43f5e' : batch.urgency === 'HIGH' ? '#f59e0b' : '#10b981',
                      borderRadius: '9999px',
                    }}></div>
                  </div>
                )}

                {/* Item Title */}
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', lineHeight: '1.4', marginBottom: '10px' }}>
                  {batch.itemTitle}
                </h3>

                {/* Donor & Facility Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px' }}>
                  <Building size={15} color="#64748b" />
                  <span>{batch.donorName}</span>
                </div>

                {/* Metrics row: Weight, Meals & Temperature */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  background: 'rgba(6, 11, 22, 0.5)',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  marginBottom: '18px',
                  textAlign: 'center',
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Weight</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#f8fafc' }}>{batch.weightLbs} lbs</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Yield</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#38bdf8' }}>{batch.estimatedMeals} meals</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>CO₂ Averted</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#34d399' }}>{batch.co2SavedKg} kg</div>
                  </div>
                </div>

                {/* Recommended Shelter Match */}
                <div style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(2, 132, 199, 0.08)',
                  border: '1px solid rgba(2, 132, 199, 0.22)',
                  fontSize: '0.82rem',
                  color: '#cbd5e1',
                  marginBottom: '20px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontWeight: '700', marginBottom: '3px' }}>
                    <MapPin size={14} />
                    <span>Auto-Matched Shelter Deficit:</span>
                  </div>
                  <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '0.88rem' }}>
                    {batch.suggestedShelterName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                    Fulfills: <strong style={{ color: '#67e8f9' }}>{batch.targetDeficitCategory}</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {isAvailable ? (
                <button
                  onClick={() => handleDispatch(batch)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                >
                  <Truck size={17} />
                  <span>Dispatch Volunteer Courier</span>
                </button>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '11px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  color: '#6ee7b7',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  <CheckCircle2 size={16} color="#10b981" /> Courier En Route to Shelter
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
