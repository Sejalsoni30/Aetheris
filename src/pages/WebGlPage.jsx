import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import { Layers, Cpu, Terminal, Copy, Check, Zap, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

export default function WebGlPage() {
  const [copied, setCopied] = useState(false);

  const jsCode = `import * as THREE from 'three';
import { AetherisSpatialShader } from '@aetheris/webgl';

// Instantiate Three.js WebGL2 Pipeline
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Attach Aetheris Autonomous Procedural Shader
const aetherisMaterial = new AetherisSpatialShader({
  colorMode: 'cyber-cyan',
  particleDensity: 2400,
  noiseTurbulence: true,
  reactiveIntentCoordinates: new THREE.Vector3(0, 0, 0)
});

const geometry = new THREE.IcosahedronGeometry(2, 64);
const mesh = new THREE.Mesh(geometry, aetherisMaterial);
scene.add(mesh);

// 60FPS continuous render loop with zero stutter
function animate() {
  requestAnimationFrame(animate);
  aetherisMaterial.uniforms.uTime.value += 0.01;
  renderer.render(scene, camera);
}
animate();`;

  const copyCode = () => {
    sound.playClick();
    navigator.clipboard.writeText(jsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      <PageHeader section="Platforms" title="WebGL / Three.js" />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-cyan-950/40 backdrop-blur-2xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>HIGH PERFORMANCE WEBGL2 & THREE.JS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Aetheris for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                WebGL & Three.js Canvas
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Bring spatial holographic computation into standard desktop and mobile web browsers. Powered by custom GLSL shaders, instanced particle buffers, and WebAssembly matrix accelerators running at a consistent 60 FPS.
            </p>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-cyan-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">60FPS WebGL2 Pipeline</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Optimized buffer geometries eliminate garbage collection pauses. Smooth GPU rendering on laptops, tablets, and mobile devices.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-teal-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Custom GLSL Shaders</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Procedural simplex noise, iridescent Fresnel glow, and ray-marched holographic fields that react to cursor and mouse proximity in real time.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/15 hover:border-emerald-500/50 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">Zero Extra Dependencies</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-normal">
              Weighs less than 28KB minified & gzipped. Plugs directly into standard Three.js or vanilla WebGL2 canvas projects without bloat.
            </p>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="rounded-3xl border border-white/15 bg-[#080d1a] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-white font-semibold">
                threejs-spatial-canvas.js
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
          <div className="p-6 font-mono text-xs sm:text-sm text-cyan-300/90 overflow-x-auto leading-relaxed">
            <pre className="text-slate-200">{jsCode}</pre>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
