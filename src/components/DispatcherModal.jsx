import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Building, Clock, Scale, Thermometer, Database } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DispatcherModal({ isOpen, onClose, donors, shelters, onAddBatch }) {
  if (!isOpen) return null;

  const [selectedDonorId, setSelectedDonorId] = useState(donors[0]?.id || 'DON-001');
  const [itemTitle, setItemTitle] = useState('');
  const [category, setCategory] = useState('Fresh Produce');
  const [weightLbs, setWeightLbs] = useState(120);
  const [hoursRemaining, setHoursRemaining] = useState(4);
  const [temperatureType, setTemperatureType] = useState('Chilled (34-38°F)');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemTitle.trim()) return;

    const donor = donors.find((d) => d.id === selectedDonorId) || donors[0];
    
    // Auto-match shelter with relevant deficit
    let matchedShelter = shelters[0];
    if (category === 'Fresh Produce') {
      matchedShelter = shelters.find(s => s.primaryDeficit.includes('Produce') || s.primaryDeficit.includes('Fruit')) || shelters[1];
    } else if (category === 'Artisan Bakery') {
      matchedShelter = shelters.find(s => s.primaryDeficit.includes('Bread') || s.primaryDeficit.includes('Grains')) || shelters[3];
    } else if (category === 'Prepared Hot Meals') {
      matchedShelter = shelters.find(s => s.primaryDeficit.includes('Prepared') || s.primaryDeficit.includes('Protein')) || shelters[0];
    } else {
      matchedShelter = shelters.find(s => s.primaryDeficit.includes('Dairy')) || shelters[2];
    }

    const estimatedMeals = Math.round(weightLbs * 1.25);
    const co2SavedKg = Math.round(weightLbs * 2.4);

    const newBatch = {
      id: `RESCUE-${Math.floor(8900 + Math.random() * 900)}`,
      donorId: donor.id,
      donorName: donor.name,
      itemTitle: itemTitle.trim(),
      category,
      weightLbs: Number(weightLbs),
      estimatedMeals,
      hoursRemaining: Number(hoursRemaining),
      temperatureType,
      urgency: hoursRemaining <= 3 ? 'CRITICAL' : hoursRemaining <= 6 ? 'HIGH' : 'MEDIUM',
      co2SavedKg,
      status: 'AVAILABLE',
      targetDeficitCategory: matchedShelter.primaryDeficit,
      suggestedShelterId: matchedShelter.id,
      suggestedShelterName: matchedShelter.name,
      logTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
    };

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10b981', '#06b6d4', '#f59e0b'],
    });

    onAddBatch(newBatch);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      backgroundColor: 'rgba(4, 7, 14, 0.78)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div className="glass-panel-glow" style={{
        maxWidth: '560px',
        width: '100%',
        backgroundColor: '#0a0f1d',
        border: '1px solid rgba(16, 185, 129, 0.4)',
        padding: '28px',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Database size={18} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff' }}>
              Log Commercial Surplus Batch
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Instantly appends to Snowflake table <code style={{ color: '#38bdf8' }}>ANALYTICS.RESCUE_INVENTORY</code>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Donor Facility Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Commercial Food Donor Facility:
            </label>
            <select
              value={selectedDonorId}
              onChange={(e) => setSelectedDonorId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.88rem',
              }}
            >
              {donors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.zone})
                </option>
              ))}
            </select>
          </div>

          {/* Item Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Surplus Item Name & Description:
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 140 lbs fresh heirloom tomatoes & crisp romaine"
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '0.88rem',
              }}
            />
          </div>

          {/* Category & Temperature */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                Food Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                }}
              >
                <option value="Fresh Produce">Fresh Produce</option>
                <option value="Artisan Bakery">Artisan Bakery</option>
                <option value="Prepared Hot Meals">Prepared Hot Meals</option>
                <option value="Chilled Dairy & Eggs">Chilled Dairy & Eggs</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                Temperature Requirement:
              </label>
              <select
                value={temperatureType}
                onChange={(e) => setTemperatureType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                }}
              >
                <option value="Chilled (34-38°F)">Chilled (34-38°F)</option>
                <option value="Ambient Dry">Ambient Dry</option>
                <option value="Hot Held (>140°F)">Hot Held (&gt;140°F)</option>
              </select>
            </div>
          </div>

          {/* Weight & Shelf Life Countdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                Batch Weight (lbs):
              </label>
              <input
                type="number"
                min="10"
                max="5000"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                Decay Window (Hours Remaining):
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="48"
                value={hoursRemaining}
                onChange={(e) => setHoursRemaining(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                }}
              />
            </div>
          </div>

          {/* Projected Impact Preview Card */}
          <div style={{
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#7dd3fc', fontWeight: '700', textTransform: 'uppercase' }}>
                Projected Rescue Yield:
              </div>
              <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: '600' }}>
                ~{Math.round(weightLbs * 1.25)} meals delivered • {Math.round(weightLbs * 2.4)} kg CO₂ averted
              </div>
            </div>
            <Sparkles size={20} color="#38bdf8" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            <PlusCircle size={18} />
            <span>Publish to Snowflake Warehouse & Match Shelter</span>
          </button>
        </form>
      </div>
    </div>
  );
}
