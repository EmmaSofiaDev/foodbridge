import React, { useState, useEffect } from 'react';
import { Play, Database, CheckCircle2, Clock, Cpu, Layers, FileCode, Sparkles, RefreshCw, Copy, Check, Download, Terminal, Filter } from 'lucide-react';
import { SNOWFLAKE_QUERIES } from '../data/snowflakeQueries';
import { executeSnowflakeQuery } from '../services/snowflakeClient';

export default function SnowflakeConsole({ batches, shelters, donors }) {
  const [selectedQueryIndex, setSelectedQueryIndex] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryResult, setQueryResult] = useState(null);
  const [executionStep, setExecutionStep] = useState(null);
  const [copied, setCopied] = useState(false);
  const [warehouseSize, setWarehouseSize] = useState('X-Small');
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');
  const [tableKey, setTableKey] = useState(0);

  const activeQuery = SNOWFLAKE_QUERIES[selectedQueryIndex];

  const handleRunQuery = async () => {
    setIsExecuting(true);
    setExecutionStep('Parsing ANSI SQL & Validating Schema...');
    
    await new Promise(r => setTimeout(r, 120));
    setExecutionStep(`Binding to ${warehouseSize} Warehouse in AWS US-EAST-1...`);
    
    await new Promise(r => setTimeout(r, 150));
    setExecutionStep('Pruning micro-partitions (75% I/O reduction)...');
    
    await new Promise(r => setTimeout(r, 120));

    // Filter batches if urgency filter is applied
    let filteredBatches = batches;
    if (urgencyFilter === 'CRITICAL') {
      filteredBatches = batches.filter(b => b.hoursRemaining <= 3.5);
    } else if (urgencyFilter === 'HIGH') {
      filteredBatches = batches.filter(b => b.hoursRemaining <= 6);
    }

    const res = await executeSnowflakeQuery(activeQuery.id, filteredBatches, shelters, donors);
    
    // Adjust execution time based on warehouse size simulation
    if (warehouseSize === 'Medium') {
      res.executionTimeMs = Math.round(res.executionTimeMs * 0.45);
    } else if (warehouseSize === 'Small') {
      res.executionTimeMs = Math.round(res.executionTimeMs * 0.7);
    }

    setQueryResult(res);
    setExecutionStep('Query executed successfully!');
    setTableKey(prev => prev + 1);
    setIsExecuting(false);
  };

  useEffect(() => {
    handleRunQuery();
  }, [selectedQueryIndex, urgencyFilter, warehouseSize, batches.length]);

  const handleCopySql = () => {
    navigator.clipboard.writeText(activeQuery.sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJson = () => {
    if (!queryResult || !queryResult.rows) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(queryResult, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `snowflake_${activeQuery.id}_export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="snowflake-console" style={{
      maxWidth: '1360px',
      margin: '0 auto 80px auto',
      padding: '0 24px',
    }}>
      <div className="glass-card-snowflake" style={{ padding: '32px' }}>
        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '22px',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(2, 132, 199, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              <Database size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
                  Snowflake SQL Analytics Console
                </h2>
                <span className="badge-status badge-medium">
                  <Terminal size={12} /> FOODBRIDGE_PROD
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '3px' }}>
                Inspect, parameterize, and execute live production SQL queries against our Snowflake Data Warehouse.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={handleCopySql} className="btn-secondary" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
              {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
              <span>{copied ? 'Copied SQL!' : 'Copy SQL'}</span>
            </button>

            <button onClick={handleExportJson} className="btn-secondary" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
              <Download size={16} />
              <span>Export JSON</span>
            </button>

            {/* Run Query Button */}
            <button
              onClick={handleRunQuery}
              disabled={isExecuting}
              className="btn-snowflake"
              style={{
                padding: '11px 24px',
                opacity: isExecuting ? 0.75 : 1,
                cursor: isExecuting ? 'not-allowed' : 'pointer',
              }}
            >
              {isExecuting ? <RefreshCw size={16} className="pulse-cyan" /> : <Play size={16} fill="#ffffff" />}
              <span style={{ fontWeight: '700' }}>
                {isExecuting ? 'Running Query...' : 'Execute Query'}
              </span>
            </button>
          </div>
        </div>

        {/* Live Controls: Warehouse Size & Urgency Filter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          background: 'rgba(15, 23, 42, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '12px 18px',
          marginBottom: '20px',
        }}>
          {/* Query Selector Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {SNOWFLAKE_QUERIES.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setSelectedQueryIndex(idx)}
                style={{
                  background: selectedQueryIndex === idx ? 'rgba(2, 132, 199, 0.28)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedQueryIndex === idx ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: selectedQueryIndex === idx ? '#ffffff' : '#94a3b8',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
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

          {/* Interactive Parameters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#cbd5e1' }}>
              <Cpu size={14} color="#38bdf8" />
              <span>Warehouse:</span>
              <select
                value={warehouseSize}
                onChange={(e) => setWarehouseSize(e.target.value)}
                style={{
                  background: '#0a0f1d',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#38bdf8',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                }}
              >
                <option value="X-Small">X-Small (1x)</option>
                <option value="Small">Small (2x)</option>
                <option value="Medium">Medium (4x High Perf)</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#cbd5e1' }}>
              <Filter size={14} color="#10b981" />
              <span>Decay Filter:</span>
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                style={{
                  background: '#0a0f1d',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#34d399',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                }}
              >
                <option value="ALL">All Batches</option>
                <option value="CRITICAL">Critical (&lt; 3.5h remaining)</option>
                <option value="HIGH">High (&lt; 6h remaining)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Execution Progress Terminal Bar */}
        <div style={{
          background: '#040711',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '12px 18px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className={isExecuting ? "pulse-cyan" : "pulse-emerald"}></span>
            <span style={{ color: isExecuting ? '#38bdf8' : '#34d399', fontWeight: '500' }}>
              {isExecuting ? executionStep : '● Ready • Snowflake COMPUTE_WH Online'}
            </span>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
            {queryResult ? `Last Run: ${queryResult.executedAt}` : 'Idle'}
          </div>
        </div>

        {/* Architectural Description */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.5)',
          borderLeft: '4px solid #0284c7',
          borderRadius: '0 10px 10px 0',
          padding: '14px 18px',
          marginBottom: '20px',
          fontSize: '0.88rem',
          color: '#cbd5e1',
          lineHeight: '1.6',
        }}>
          <strong style={{ color: '#ffffff' }}>Why this query matters: </strong>
          {activeQuery.description}
        </div>

        {/* SQL Code View */}
        <div style={{
          background: '#040711',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          borderRadius: '14px',
          padding: '18px 20px',
          marginBottom: '24px',
          position: 'relative',
          overflowX: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.75rem', marginBottom: '10px' }}>
            <span style={{ fontWeight: '700', letterSpacing: '0.05em' }}>SNOWFLAKE ANSI SQL VIEW</span>
            <span>CLUSTER_BY (status, category, hours_remaining)</span>
          </div>
          <pre style={{ margin: 0, color: '#38bdf8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '1.6' }}>
            <code>{activeQuery.sql}</code>
          </pre>
        </div>

        {/* Execution Telemetry Grid */}
        {queryResult && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            background: 'rgba(2, 132, 199, 0.08)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            borderRadius: '14px',
            padding: '16px 20px',
            marginBottom: '24px',
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Query ID</div>
              <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#f8fafc', marginTop: '2px' }}>
                {queryResult.queryId}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Warehouse Execution</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#34d399', marginTop: '2px' }}>
                {queryResult.executionTimeMs} ms
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Micro-Partition Pruning</div>
              <div style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: '700', marginTop: '2px' }}>
                {queryResult.partitionsScanned}/{queryResult.partitionsTotal} Scanned (75% saved)
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Data Scanned</div>
              <div style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: '600', marginTop: '2px' }}>
                {queryResult.bytesScanned}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Matching Rows</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#f8fafc', marginTop: '2px' }}>
                {queryResult.rowCount} rows
              </div>
            </div>
          </div>
        )}

        {/* Live Query Results Table with Animation Key */}
        {queryResult && queryResult.rows && (
          <div
            key={tableKey}
            className="query-flash"
            style={{
              overflowX: 'auto',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(8, 12, 22, 0.7)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: '#0a1020', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  {activeQuery.sampleResultHeaders.map((h, i) => (
                    <th key={i} style={{ padding: '14px 16px', color: '#94a3b8', fontWeight: '700', letterSpacing: '0.04em' }}>
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
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      background: rowIdx % 2 === 0 ? 'rgba(15, 23, 42, 0.35)' : 'transparent',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = rowIdx % 2 === 0 ? 'rgba(15, 23, 42, 0.35)' : 'transparent')
                    }
                  >
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} style={{ padding: '12px 16px', color: '#f8fafc' }}>
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
