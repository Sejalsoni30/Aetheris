import React from 'react';
import Navbar from '../components/Navbar';
import ThreeHeroScene from '../components/ThreeHeroScene';
import HeroSection from '../components/HeroSection';
import NeuralCoreSection from '../components/NeuralCoreSection';
import BentoFeatures from '../components/BentoFeatures';
import TelemetryDashboard from '../components/TelemetryDashboard';
import ExperiencePlayground from '../components/ExperiencePlayground';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      {/* 3D WebGL Interactive Hero Scene - Exclusively for Home Hero */}
      <ThreeHeroScene />
      
      <Navbar />
      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <NeuralCoreSection />
        <BentoFeatures />
        <TelemetryDashboard />
      </main>
      <Footer />

      {/* Floating 3D Experience Playground / Shader Switcher on Home */}
      <ExperiencePlayground />
    </>
  );
}
