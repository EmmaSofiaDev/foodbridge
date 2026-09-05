import React from 'react';
import { Heart, Database, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      backgroundColor: '#050810',
      padding: '48px 24px 36px 24px',
      color: '#94a3b8',
      fontSize: '0.85rem',
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>
              Food<span style={{ color: '#10b981' }}>Bridge</span>
            </span>
            <span style={{
              background: 'rgba(2, 132, 199, 0.15)',
              color: '#38bdf8',
              fontSize: '0.7rem',
              fontWeight: '700',
              padding: '2px 7px',
              borderRadius: '4px',
            }}>
              SNOWFLAKE EDITION
            </span>
          </div>
          <p style={{ maxWidth: '480px', lineHeight: '1.6' }}>
            An open-source humanitarian food rescue network stopping municipal food waste and bridging urban nutritional deficits in sub-second cloud analytics.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'right' }}>
          <div style={{ color: '#cbd5e1', fontWeight: '600' }}>
            DEV Weekend Challenge: Generosity Edition
          </div>
          <div>
            Built with <Heart size={14} color="#f43f5e" style={{ display: 'inline', verticalAlign: 'middle' }} /> in honor of UN International Day of Charity
          </div>
          <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
            Licensed under MIT • Powered by Snowflake Data Cloud
          </div>
        </div>
      </div>
    </footer>
  );
}
