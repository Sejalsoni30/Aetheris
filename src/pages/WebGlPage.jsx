import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import SpatialModuleExplorer from '../components/SpatialModuleExplorer';
import { 
  Layers, 
  Cpu, 
  Terminal, 
  Copy, 
  Check, 
  Zap, 
  Sparkles, 
  Sliders, 
  RotateCw, 
  Maximize2,
  Activity,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function WebGlPage() {
  const [copied, setCopied] = useState(false);
  const canvasContainerRef = useRef(null);

  const [geometryType, setGeometryType] = useState('torus');
  const [colorTheme, setColorTheme] = useState('cyan');
  const [particleDensity, setParticleDensity] = useState(1800);
  const [rotationSpeed, setRotationSpeed] = useState(1.0);
  const [wireframeMode, setWireframeMode] = useState(true);

  const THEME_HEX = {
    cyan: 0x00f2fe,
    purple: 0xa855f7,
    gold: 0xf59e0b,
    emerald: 0x10b981
  };

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    let geom;
    if (geometryType === 'torus') {
      geom = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 32);
    } else if (geometryType === 'icosahedron') {
      geom = new THREE.IcosahedronGeometry(1.6, 4);
    } else {
      geom = new THREE.SphereGeometry(1.5, 32, 32);
    }

    const material = new THREE.MeshStandardMaterial({
      color: THEME_HEX[colorTheme],
      wireframe: wireframeMode,
      roughness: 0.2,
      metalness: 0.8,
      emissive: THEME_HEX[colorTheme],
      emissiveIntensity: 0.3
    });

    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(THEME_HEX[colorTheme], 3, 20);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      mesh.rotation.y += 0.005 * rotationSpeed;
      mesh.rotation.x += 0.003 * rotationSpeed;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geom.dispose();
      material.dispose();
    };
  }, [geometryType, colorTheme, rotationSpeed, wireframeMode]);

  const dynamicCode = `import * as THREE from 'three';
import { AetherisSpatialShader } from '@aetheris/webgl';

// Instantiate Three.js WebGL2 Pipeline with Active Parameters
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

const shaderMaterial = new AetherisSpatialShader({
  colorPalette: '${colorTheme}',
  particleDensity: ${particleDensity},
  wireframe: ${wireframeMode},
  rotationSpeed: ${rotationSpeed.toFixed(1)},
  reactiveIntent: true
});

const geometry = new THREE.${geometryType === 'torus' ? 'TorusKnotGeometry(1.2, 0.35, 128, 32)' : geometryType === 'icosahedron' ? 'IcosahedronGeometry(1.6, 4)' : 'SphereGeometry(1.5, 32, 32)'};
const mesh = new THREE.Mesh(geometry, shaderMaterial);
scene.add(mesh);`;

  const copyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(dynamicCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Platforms" title="WebGL / Three.js" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* ================= HERO SECTION with Glowing Ambient Backdrop ================= */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-cyan-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>HIGH PERFORMANCE WEBGL2 & THREE.JS SHADERS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Aetheris for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-300">
                Browser-Native 3D WebGL
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              High-speed browser-based volumetric ad synthesis. Harness WebGL2, WebGPU compute pipelines, and Three.js shader instancing to render holographic brand experiences at solid 60FPS on any mobile or desktop device.
            </p>

            {/* Live High-Tech HUD Metrics Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Hardware Engine</div>
                <div className="text-sm font-mono font-bold text-cyan-300">WebGL2 / WebGPU</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Frame Refresh</div>
                <div className="text-sm font-mono font-bold text-emerald-300">60 FPS Continuous</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Draw Calls</div>
                <div className="text-sm font-mono font-bold text-purple-300">1 Instanced Call</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Client Footprint</div>
                <div className="text-sm font-mono font-bold text-amber-300">&lt; 42KB Zero-Dep</div>
              </div>
            </div>

            {/* Quick Hero Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  document.getElementById('webgl-sandbox')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white font-mono text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center space-x-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Manipulate 3D Shader</span>
              </button>
              
              <button
                onClick={copyCode}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-mono text-xs transition-all cursor-pointer flex items-center space-x-2"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy Synced JS Snippet</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE SECTION: Live WebGL Shader Sandbox ================= */}
        <div id="webgl-sandbox" className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 to-[#080d1a] backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Real-Time GPU Hardware Sandbox</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Live 3D WebGL Hologram Shader Studio
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Click and drag to rotate the 3D volumetric mesh. Adjust live shader uniforms below.
              </p>
            </div>

            <div className="flex items-center space-x-2 p-1 bg-white/5 border border-white/10 rounded-xl shrink-0">
              {[
                { id: 'torus', label: 'Torus Knot' },
                { id: 'icosahedron', label: 'Icosahedron' },
                { id: 'sphere', label: 'Cyber Sphere' },
              ].map(g => (
                <button
                  key={g.id}
                  onClick={() => { sound.playClick(); setGeometryType(g.id); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    geometryType === g.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Live Three.js Canvas Container */}
            <div className="lg:col-span-8 relative h-80 sm:h-96 rounded-2xl border-2 border-white/15 bg-black/80 overflow-hidden shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing">
              <div ref={canvasContainerRef} className="w-full h-full" />
              
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-[10px] font-mono text-slate-300 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>WEBGL2 ACCELERATED • 60 FPS</span>
              </div>

              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                Drag to Rotate 3D Mesh
              </div>
            </div>

            {/* Interactive Shader Controls */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-5 rounded-2xl border border-white/10 bg-slate-900/80 p-5 font-mono text-xs">
              
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-white/10 pb-2 flex items-center space-x-2">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Shader Uniform Controls</span>
                </div>

                {/* Color Palette Switcher */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400">Hologram Chromatic Palette:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'cyan', label: 'Cyber Cyan', border: 'border-cyan-400/50 text-cyan-300' },
                      { id: 'purple', label: 'Deep Violet', border: 'border-purple-400/50 text-purple-300' },
                      { id: 'gold', label: 'Solar Gold', border: 'border-amber-400/50 text-amber-300' },
                      { id: 'emerald', label: 'Emerald Mint', border: 'border-emerald-400/50 text-emerald-300' },
                    ].map(c => (
                      <button
                        key={c.id}
                        onClick={() => { sound.playClick(); setColorTheme(c.id); }}
                        className={`p-2 rounded-xl text-left border text-[11px] font-mono transition-all cursor-pointer ${
                          colorTheme === c.id 
                            ? `bg-white/10 ${c.border} font-bold shadow-md` 
                            : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rotation Speed Slider */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Angular Velocity:</span>
                    <span className="text-cyan-300 font-bold">{rotationSpeed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.1"
                    value={rotationSpeed}
                    onChange={(e) => setRotationSpeed(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Wireframe Toggle */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-300">Wireframe Mesh Rasterizer:</span>
                  <button
                    onClick={() => { sound.playClick(); setWireframeMode(!wireframeMode); }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      wireframeMode 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold' 
                        : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}
                  >
                    {wireframeMode ? 'Enabled' : 'Solid'}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-[10px] text-slate-400 space-y-1">
                <div>Active Vertices: <strong className="text-white">8,192 Nodes</strong></div>
                <div>GPU Draw Calls: <strong className="text-emerald-400">1 (Instanced)</strong></div>
              </div>

            </div>

          </div>

        </div>

        {/* Dynamic Code Generator */}
        <div className="rounded-3xl border border-white/15 bg-[#080d1a] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-white font-semibold">
                Synthesized AetherisWebGLShader.js (Live Synced)
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JS Snippet'}</span>
            </button>
          </div>
          <div className="p-6 font-mono text-xs sm:text-sm text-cyan-300/90 overflow-x-auto leading-relaxed">
            <pre className="text-slate-200">{dynamicCode}</pre>
          </div>
        </div>

        {/* Cross-Protocol Matrix Navigation Deck */}
        <SpatialModuleExplorer currentPath="/platforms/webgl" />

      </main>

      <Footer />
    </div>
  );
}
