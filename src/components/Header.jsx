import React from 'react';
import { Database, PlusCircle, Terminal, Sparkles, Activity } from 'lucide-react';
import { SNOWFLAKE_METADATA } from '../data/mockSnowflakeData';

// Brand Logo Icon (matching tab favicon)
function BrandLogoIcon({ size = 24, color = '#10b981', strokeWidth = 2.2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' }}
    >
      <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
      <path d="M12 12 2.1 12a10.1 10.1 0 0 0 1.9 4.3" />
      <path d="M12 12l4 8.5" />
    </svg>
  );
}

export default function Header({ onOpenDispatcher, onToggleConsole, showConsole, stats }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      backgroundColor: 'rgba(8, 12, 20, 0.82)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '14px 24px',
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        {/* Logo & Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(6, 182, 212, 0.12) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)',
          }}>
            <BrandLogoIcon size={24} color="#10b981" strokeWidth={2.3} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#ffffff' }}>
                Food<span style={{ color: '#10b981' }}>Bridge</span>
              </span>
              <span style={{
                background: 'rgba(2, 132, 199, 0.18)',
                color: '#38bdf8',
                border: '1px solid rgba(2, 132, 199, 0.4)',
                fontSize: '0.7rem',
                fontWeight: '700',
                padding: '2px 7px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <Database size={10} /> SNOWFLAKE
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
              Real-Time Surplus Food Rescue & Hunger Grid
            </p>
          </div>
        </div>

        {/* Snowflake Live Telemetry Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '9999px',
          padding: '6px 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span className="pulse-dot" style={{ backgroundColor: '#10b981' }}></span>
            <span style={{ fontSize: '0.76rem', color: '#cbd5e1', fontWeight: '600' }}>
              WH: <span style={{ color: '#38bdf8', fontFamily: 'monospace' }}>COMPUTE_WH</span>
            </span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={13} color="#10b981" />
            <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
              <strong style={{ color: '#f8fafc' }}>{stats.totalPounds.toLocaleString()}</strong> lbs in warehouse
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onToggleConsole}
            className="btn-secondary"
            style={{
              borderColor: showConsole ? '#0284c7' : 'rgba(255, 255, 255, 0.08)',
              backgroundColor: showConsole ? 'rgba(2, 132, 199, 0.18)' : 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <Terminal size={16} color={showConsole ? '#38bdf8' : '#cbd5e1'} />
            <span style={{ fontSize: '0.85rem' }}>SQL Console</span>
          </button>

          <button onClick={onOpenDispatcher} className="btn-primary">
            <PlusCircle size={16} />
            <span style={{ fontSize: '0.85rem' }}>Simulate Rescue</span>
          </button>
        </div>
      </div>
    </header>
  );
}
