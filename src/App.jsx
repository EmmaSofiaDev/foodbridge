import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ImpactStats from './components/ImpactStats';
import RescueGrid from './components/RescueGrid';
import SnowflakeConsole from './components/SnowflakeConsole';
import ShelterDirectory from './components/ShelterDirectory';
import ArchitectureSection from './components/ArchitectureSection';
import DispatcherModal from './components/DispatcherModal';
import Footer from './components/Footer';

import { INITIAL_BATCHES, INITIAL_SHELTERS, INITIAL_DONORS } from './data/mockSnowflakeData';
import { calculateGlobalMetrics } from './services/snowflakeClient';

export default function App() {
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [shelters, setShelters] = useState(INITIAL_SHELTERS);
  const [donors, setDonors] = useState(INITIAL_DONORS);
  const [isDispatcherOpen, setIsDispatcherOpen] = useState(false);
  const [showConsole, setShowConsole] = useState(false);

  // Compute live global metrics
  const stats = calculateGlobalMetrics(batches);

  const handleAddBatch = (newBatch) => {
    setBatches((prev) => [newBatch, ...prev]);
    // Update donor totals
    setDonors((prev) =>
      prev.map((d) =>
        d.id === newBatch.donorId
          ? {
              ...d,
              totalPoundsDonated: d.totalPoundsDonated + newBatch.weightLbs,
              activeListings: d.activeListings + 1,
            }
          : d
      )
    );
  };

  const handleDispatchBatch = (batchId) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status: 'DISPATCHED' } : b))
    );

    const dispatchedBatch = batches.find((b) => b.id === batchId);
    if (dispatchedBatch && dispatchedBatch.suggestedShelterId) {
      setShelters((prev) =>
        prev.map((s) =>
          s.id === dispatchedBatch.suggestedShelterId
            ? { ...s, totalMealsReceived: s.totalMealsReceived + dispatchedBatch.estimatedMeals }
            : s
        )
      );
    }
  };

  const handleToggleConsole = () => {
    setShowConsole(!showConsole);
    const el = document.getElementById('snowflake-console');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        onOpenDispatcher={() => setIsDispatcherOpen(true)}
        onToggleConsole={handleToggleConsole}
        showConsole={showConsole}
        stats={stats}
      />

      <main style={{ flex: 1 }}>
        <HeroSection
          onOpenDispatcher={() => setIsDispatcherOpen(true)}
          onToggleConsole={handleToggleConsole}
        />

        <ImpactStats
          stats={stats}
          donorCount={donors.length}
          shelterCount={shelters.length}
        />

        <RescueGrid
          batches={batches}
          onDispatchBatch={handleDispatchBatch}
        />

        <SnowflakeConsole
          batches={batches}
          shelters={shelters}
          donors={donors}
        />

        <ShelterDirectory shelters={shelters} />

        <ArchitectureSection />
      </main>

      <DispatcherModal
        isOpen={isDispatcherOpen}
        onClose={() => setIsDispatcherOpen(false)}
        donors={donors}
        shelters={shelters}
        onAddBatch={handleAddBatch}
      />

      <Footer />
    </div>
  );
}
