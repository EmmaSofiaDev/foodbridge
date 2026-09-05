import React from 'react';
import { ArrowRight, Flame, Database, ShieldAlert, HeartHandshake, Leaf } from 'lucide-react';

export default function HeroSection({ onOpenDispatcher, onToggleConsole }) {
  return (
    <section style={{
      padding: '48px 24px 32px 24px',
      maxWidth: '1360px',
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '240px',
        background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}></div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '880px', margin: '0 auto' }}>
        {/* Generosity Edition Hackathon Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          padding: '6px 14px',
          borderRadius: '9999px',
          marginBottom: '20px',
        }}>
          <HeartHandshake size={15} color="#10b981" />
          <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#6ee7b7' }}>
            Built for DEV Weekend Challenge: Generosity Edition & UN Charity Day
          </span>
        </div>

        {/* Impactful Title */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
          fontWeight: '800',
          lineHeight: '1.15',
          color: '#ffffff',
          marginBottom: '20px',
        }}>
          We Throw Away <span style={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>1.3 Billion Tons</span> of Food While People Starve.
        </h1>

        {/* Subtitle with core vision */}
        <p style={{
          fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
          color: '#cbd5e1',
          lineHeight: '1.6',
          marginBottom: '32px',
          fontWeight: '400',
        }}>
          FoodBridge connects commercial supermarkets, bakeries, and dining halls directly with local emergency shelters in real-time. Powered by <strong style={{ color: '#38bdf8' }}>Snowflake Data Cloud</strong>, we prioritize perishing inventory, match dietary deficits, and calculate EPA carbon mitigation in sub-second queries.
        </p>

        {/* Call to action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button onClick={onOpenDispatcher} className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
            <span>Simulate Surplus Rescue</span>
            <ArrowRight size={18} />
          </button>
          
          <button onClick={onToggleConsole} className="btn-snowflake" style={{ padding: '12px 24px', fontSize: '0.95rem' }}>
            <Database size={18} />
            <span>Open Snowflake SQL Console</span>
          </button>
        </div>

        {/* 3 Value Pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginTop: '44px',
          textAlign: 'left',
        }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(244, 63, 94, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Flame size={18} color="#f43f5e" />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>Zero Landfill Waste</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.5' }}>
              Dynamic shelf-life decay monitoring ensures food is rerouted hours before expiration, not discarded.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(2, 132, 199, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Database size={18} color="#38bdf8" />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>Snowflake Columnar Engine</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.5' }}>
              Micro-partition clustering aggregates citywide food deficits across 500+ shelters with sub-second queries.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Leaf size={18} color="#10b981" />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>EPA Carbon Auditing</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.5' }}>
              Automatic EPA WARM model telemetry tracking methane and greenhouse gas avoidance per rescued pound.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
