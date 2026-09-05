import React, { useState, useEffect } from 'react';
import { Play, Database, CheckCircle2, Clock, Cpu, Layers, FileCode, Sparkles, RefreshCw } from 'lucide-react';
import { SNOWFLAKE_QUERIES } from '../data/snowflakeQueries';
import { executeSnowflakeQuery } from '../services/snowflakeClient';

export default function SnowflakeConsole({ batches, shelters, donors }) {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryResult, setQueryResult] = useState(null);

  const activeQuery = SNOWFLAKE_QUERIES[selectedQueryIndex];

  const handleRunQuery = async () => {
    setIsExecuting(true);
    try {
      const res = await executeSnowflakeQuery(activeQuery.id, batches, shelters, donors);
      setQueryResult(res);
    } finally {
      setIsExecuting(false);
    }
  };

  // Run automatically when selected query changes
  useEffect(() => {
    handleRunQuery();
  }, [selectedQueryIndex, batches.length]);

  return (
    <section id="snowflake-console" style={{
      maxWidth: '1360px',
      margin: '0 auto 60px auto',
      padding: '0 24px',
    }}>
      <div className="glass-panel" style={{ padding: '28px', border: '1px solid rgba(2, 132, 199, 0.4)' }}>
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '20px',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(2, 132, 199, 0.4)',
            }}>
              <Database size={22} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>
                  Snowflake SQL Analytics Console
                </h2>
                <span className="badge-snowflake">
                  FOODBRIDGE_PROD
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Inspect and execute production SQL queries against our Snowflake Data Warehouse.
              </p>
            </div>
          </div>

          {/* Run Button */}
          <button
            onClick={handleRunQuery}
            disabled={isExecuting}
            className="btn-snowflake"
            style={{ opacity: isExecuting ? 0.7 : 1 }}
          >
            {isExecuting ? <RefreshCw size={16} className="pulse-dot" /> : <Play size={16} fill="#ffffff" />}
            <span>{isExecuting ? 'Running on COMPUTE_WH...' : 'Execute Query'}</span>
          </button>
        </div>

        {/* Query Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '16px',
        }}>
          {SNOWFLAKE_QUERIES.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setSelectedQueryIndex(idx)}
              style={{
                background: selectedQueryIndex === idx ? 'rgba(2, 132, 199, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedQueryIndex === idx ? '1px solid #0284c7' : '1px solid rgba(255, 255, 255, 0.06)',
                color: selectedQueryIndex === idx ? '#38bdf8' : '#cbd5e1',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {q.title}
            </button>
          ))}
        </div>

        {/* Description & Engineering Rationale */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '10px',
          padding: '12px 16px',
          marginBottom: '16px',
          fontSize: '0.85rem',
          color: '#94a3b8',
          lineHeight: '1.5',
        }}>
          <strong style={{ color: '#f8fafc' }}>Architectural Rationale: </strong>
          {activeQuery.description}
        </div>

        {/* SQL Code Box */}
        <div className="code-block" style={{ padding: '16px', marginBottom: '20px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.75rem', marginBottom: '8px' }}>
            <span>SQL VIEW DEFINITION</span>
            <span>DIALECT: SNOWFLAKE ANSI SQL</span>
          </div>
          <pre style={{ margin: 0, color: '#38bdf8' }}>
            <code>{activeQuery.sql}</code>
          </pre>
        </div>

        {/* Execution Metadata Telemetry Bar */}
        {queryResult && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(2, 132, 199, 0.2)',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '20px',
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Query ID</div>
              <div style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: '#f8fafc' }}>
                {queryResult.queryId}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Execution Time</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#34d399' }}>
                {queryResult.executionTimeMs} ms
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Warehouse & Cluster</div>
              <div style={{ fontSize: '0.82rem', color: '#f8fafc' }}>
                {queryResult.warehouse} (X-Small)
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Micro-Partitions</div>
              <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: '600' }}>
                {queryResult.partitionsScanned}/{queryResult.partitionsTotal} Pruned (75% saved)
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Rows Returned</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f8fafc' }}>
                {queryResult.rowCount} rows
              </div>
            </div>
          </div>
        )}

        {/* Live Query Results Table */}
        {queryResult && queryResult.rows && (
          <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: '#0a0f1d', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  {activeQuery.sampleResultHeaders.map((h, i) => (
                    <th key={i} style={{ padding: '12px 14px', color: '#94a3b8', fontWeight: '600', letterSpacing: '0.04em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResult.rows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      background: rowIdx % 2 === 0 ? 'rgba(15, 23, 42, 0.4)' : 'transparent',
                    }}
                  >
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} style={{ padding: '10px 14px', color: '#f8fafc' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
