import React from 'react';
import { Database, Layers, ShieldCheck, Zap, Server, Activity } from 'lucide-react';

export default function ArchitectureSection() {
  return (
    <section style={{ maxWidth: '1360px', margin: '0 auto 80px auto', padding: '0 24px' }}>
      <div className="glass-panel" style={{ padding: '36px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '720px', marginBottom: '32px' }}>
          <span style={{
            background: 'rgba(2, 132, 199, 0.15)',
            color: '#38bdf8',
            border: '1px solid rgba(2, 132, 199, 0.3)',
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '3px 10px',
            borderRadius: '9999px',
            display: 'inline-block',
            marginBottom: '10px',
          }}>
            TECHNICAL ARCHITECTURE
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', lineHeight: '1.3' }}>
            How Snowflake Powers Real-Time Hunger Logistics
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '8px', lineHeight: '1.6' }}>
            Food rescue cannot rely on traditional transactional databases because matching thousands of expiring food batches across hundreds of shelters requires fast window ranking, spatial calculations, and environmental equations.
          </p>
        </div>

        {/* 3 Tier Architecture Diagram */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}>
          {/* Bronze Tier */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px' }}>
              <Layers size={16} />
              <span>BRONZE TIER: REAL-TIME INGESTION</span>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
              Raw Retail Surplus Streams
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.5' }}>
              High-throughput streaming ingestion from supermarket registers, wholesale manifests, and institutional kitchens directly into staging tables.
            </p>
          </div>

          {/* Silver Tier */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(2, 132, 199, 0.3)',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px' }}>
              <Database size={16} />
              <span>SILVER TIER: CLUSTERED WAREHOUSE</span>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
              Micro-Partition Decay Clustering
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.5' }}>
              Tables clustered by <code style={{ color: '#38bdf8' }}>CLUSTER BY (status, category, hours_remaining)</code>, enabling sub-second partition pruning and zero table scans.
            </p>
          </div>

          {/* Gold Tier */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '700', fontSize: '0.85rem', marginBottom: '8px' }}>
              <Zap size={16} />
              <span>GOLD TIER: DISPATCH & ANALYTICS</span>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
              Secure Materialized Views
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.5' }}>
              Live views computing perishable urgency scores, nutritional deficit matching, and EPA WARM greenhouse gas equations in sub-200ms query times.
            </p>
          </div>
        </div>

        {/* 4 Technical Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          background: 'rgba(4, 7, 14, 0.4)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>Auto-Suspend</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>300s Idle Sleep</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Zero compute cost during off-hours</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>Query Performance</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#38bdf8' }}>142ms Avg Latency</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Sub-second analytics at scale</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>Environmental Model</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#10b981' }}>EPA WARM 2.4x</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Verified GHG mitigation metric</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase' }}>Availability SLA</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#f59e0b' }}>99.99% Uptime</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Critical bedside & foodbank continuity</div>
          </div>
        </div>
      </div>
    </section>
  );
}
