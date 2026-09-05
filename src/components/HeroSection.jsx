import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, Database, HeartHandshake, Leaf, TrendingUp, ShieldCheck, PlayCircle } from 'lucide-react';

export default function HeroSection({ onOpenDispatcher, onToggleConsole }) {
  const [wastedTons, setWastedTons] = useState(1300000000);

  // Live real-time food waste ticking counter (approx 41 tons per second globally)
  useEffect(() => {
    const timer = setInterval(() => {
      setWastedTons(prev => prev + 41);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{
      padding: '72px 24px 48px 24px',
      maxWidth: '1360px',
      margin: '0 auto',
      position: 'relative',
      textAlign: 'center',
    }}>
      {/* Centered Pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(16, 185, 129, 0.12)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        padding: '8px 18px',
        borderRadius: '9999px',
        marginBottom: '28px',
        backdropFilter: 'blur(10px)',
      }}>
        <HeartHandshake size={16} color="#10b981" />
        <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#6ee7b7', letterSpacing: '0.02em' }}>
          DEV Weekend Challenge: Generosity Edition • UN International Day of Charity
        </span>
      </div>

      {/* Hero Headline */}
      <h1 style={{
        fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
        fontWeight: '800',
        lineHeight: '1.12',
        color: '#ffffff',
        marginBottom: '24px',
        letterSpacing: '-0.03em',
        maxWidth: '1080px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        Turning Commercial Food Surplus into <br />
        <span style={{
          background: 'linear-gradient(135deg, #10b981 0%, #38bdf8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Real-Time Rescue Logistics
        </span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
        color: '#94a3b8',
        lineHeight: '1.65',
        marginBottom: '40px',
        maxWidth: '820px',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: '400',
      }}>
        Every evening, supermarkets discard thousands of pounds of fresh food while local shelters face severe protein deficits. <strong style={{ color: '#f8fafc' }}>FoodBridge</strong> pairs surplus inventory with emergency food pantries in sub-second <strong style={{ color: '#38bdf8' }}>Snowflake Data Cloud</strong> analytics.
      </p>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        marginBottom: '54px',
      }}>
        <button onClick={onOpenDispatcher} className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
          <span>Simulate Surplus Rescue</span>
          <ArrowRight size={18} />
        </button>

        <button onClick={onToggleConsole} className="btn-snowflake" style={{ padding: '14px 28px', fontSize: '1rem' }}>
          <Database size={18} />
          <span>Launch Snowflake SQL Console</span>
        </button>
      </div>

      {/* Global Ticker Banner */}
      <div className="glass-card" style={{
        maxWidth: '920px',
        margin: '0 auto',
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(6, 12, 24, 0.85) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="pulse-emerald"></span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '700' }}>
              Global Food Waste Paradox (Live Estimate)
            </span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
            {wastedTons.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#f43f5e', fontWeight: '600' }}>tons this year</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          paddingLeft: '24px',
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Food Insecure</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#38bdf8' }}>828 Million</div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Dispatch Velocity</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#10b981' }}>&lt; 150 ms</div>
          </div>
        </div>
      </div>
    </section>
  );
}
