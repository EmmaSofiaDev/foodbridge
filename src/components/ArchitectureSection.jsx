import React from 'react';
import { Database, Layers, ShieldCheck, Zap, Server, Activity, ArrowRight } from 'lucide-react';

export default function ArchitectureSection() {
  return (
    <section style={{ maxWidth: '1360px', margin: '0 auto 90px auto', padding: '0 24px' }}>
      <div className="glass-card" style={{ padding: '40px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div style={{ maxWidth: '780px', marginBottom: '36px' }}>
          <span className="badge-status badge-medium" style={{ marginBottom: '12px' }}>
            ENGINEERING ARCHITECTURE
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#ffffff', lineHeight: '1.25', letterSpacing: '-0.02em' }}>
            How Snowflake Powers Real-Time Food Rescue
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: '10px', lineHeight: '1.65' }}>
            Matching hundreds of rapidly perishing food crates across dozens of crisis shelters requires complex window rankings, micro-partition pruning, and live environmental formulas that traditional relational databases cannot process under 200ms.
          </p>
        </div>

        {/* 3 Tier Architecture Diagram with Visual Flow */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '36px',
        }}>
          {/* Bronze Tier */}
          <div className="glass-card" style={{ padding: '28px', background: 'rgba(15, 23, 42, 0.55)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.04em', marginBottom: '10px' }}>
              <Layers size={16} />
              <span>BRONZE TIER • INGESTION</span>
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
              Real-Time Retail Streams
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6' }}>
              Streaming manifests from supermarket point-of-sale registers, wholesale terminals, and commercial bakeries loaded into staging tables.
            </p>
          </div>

          {/* Silver Tier */}
          <div className="glass-card" style={{ padding: '28px', background: 'rgba(15, 23, 42, 0.55)', border: '1px solid rgba(2, 132, 199, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.04em', marginBottom: '10px' }}>
              <Database size={16} />
              <span>SILVER TIER • WAREHOUSE</span>
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
              Micro-Partition Clustering
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6' }}>
              Clustered by <code style={{ color: '#38bdf8' }}>CLUSTER BY (status, category, hours_remaining)</code>, enabling 75% partition pruning on sub-second mobile courier queries.
            </p>
          </div>

          {/* Gold Tier */}
          <div className="glass-card" style={{ padding: '28px', background: 'rgba(15, 23, 42, 0.55)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.04em', marginBottom: '10px' }}>
              <Zap size={16} />
              <span>GOLD TIER • ANALYTICS</span>
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
              Secure Materialized Views
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6' }}>
              Sub-second analytical views calculating urgency countdowns, hunger equity indexes, and EPA WARM greenhouse gas mitigation metrics.
            </p>
          </div>
        </div>

        {/* 4 Technical Metrics Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          background: 'rgba(6, 10, 20, 0.6)',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '600' }}>Auto-Suspend</div>
            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>300s Idle Sleep</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>Zero compute cost during off-hours</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '600' }}>Query Latency</div>
            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#38bdf8', marginTop: '2px' }}>142ms Avg Run</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>Sub-second mobile responsiveness</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '600' }}>Carbon Modeling</div>
            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#10b981', marginTop: '2px' }}>EPA WARM 2.40x</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>Audited greenhouse gas telemetry</div>
          </div>
          <div>
            <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '600' }}>High Availability</div>
            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#f59e0b', marginTop: '2px' }}>99.99% Cloud SLA</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>Reliable disaster & relief continuity</div>
          </div>
        </div>
      </div>
    </section>
  );
}
