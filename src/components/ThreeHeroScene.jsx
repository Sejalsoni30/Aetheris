import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export default function ThreeHeroScene() {
  const mountRef = useRef(null);
  const { theme, particleDensity, rotationSpeed, showConnections, turbulence } = useTheme();

  // Store mutable refs for values that change dynamically without recreating the scene
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const densityRef = useRef(particleDensity);
  densityRef.current = particleDensity;

  const rotationSpeedRef = useRef(rotationSpeed);
  rotationSpeedRef.current = rotationSpeed;

  const showConnectionsRef = useRef(showConnections);
  showConnectionsRef.current = showConnections;

  const turbulenceRef = useRef(turbulence);
  turbulenceRef.current = turbulence;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.025);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Generate procedural glowing circle texture for particles
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const particleTexture = createGlowTexture();

    // 3. Main Neural Sphere & Point Cloud
    const particleCount = densityRef.current || 2000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const color1 = new THREE.Color(themeRef.current.hexPrimary);
    const color2 = new THREE.Color(themeRef.current.hexSecondary);

    const radius = 10.5;

    for (let i = 0; i < particleCount; i++) {
      // Golden Spiral / Fibonacci sphere distribution with organic variance
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = radius * (0.8 + Math.random() * 0.4);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Color interpolation
      const mixedColor = color1.clone().lerp(color2, Math.random() * 0.8);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      scales[i] = 1.0 + Math.random() * 2.0;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // 4. Central Neural Core (Pulsing Geometric Sphere)
    const coreGeometry = new THREE.IcosahedronGeometry(4.2, 3);
    const coreWireframe = new THREE.WireframeGeometry(coreGeometry);
    const coreLineMaterial = new THREE.LineBasicMaterial({
      color: themeRef.current.hexPrimary,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.LineSegments(coreWireframe, coreLineMaterial);
    scene.add(coreMesh);

    // 5. Outer Synaptic Halo Ring
    const ringGeometry = new THREE.TorusGeometry(12.5, 0.08, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: themeRef.current.hexSecondary,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
      blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // 6. Neural Synapse Connecting Lines (Plexus effect for top nodes)
    const maxLines = 150;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // 7. Interactive Mouse & Scroll State
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (event) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset;
    };

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // 8. Animation Loop
    const startTime = performance.now();
    let animationFrameId;

    const currentPrimaryColor = new THREE.Color(themeRef.current.hexPrimary);
    const targetPrimaryColor = new THREE.Color(themeRef.current.hexPrimary);
    const currentSecondaryColor = new THREE.Color(themeRef.current.hexSecondary);
    const targetSecondaryColor = new THREE.Color(themeRef.current.hexSecondary);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Smooth scroll lerp
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Color transitions
      targetPrimaryColor.setHex(themeRef.current.hexPrimary);
      targetSecondaryColor.setHex(themeRef.current.hexSecondary);
      currentPrimaryColor.lerp(targetPrimaryColor, 0.05);
      currentSecondaryColor.lerp(targetSecondaryColor, 0.05);

      coreLineMaterial.color.copy(currentPrimaryColor);
      ringMaterial.color.copy(currentSecondaryColor);

      const rotMultiplier = rotationSpeedRef.current;
      const isTurbulent = turbulenceRef.current;

      // Rotate group
      particleSystem.rotation.y = elapsedTime * 0.08 * rotMultiplier + mouse.x * 0.5;
      particleSystem.rotation.x = elapsedTime * 0.04 * rotMultiplier + mouse.y * 0.3;
      particleSystem.rotation.z = Math.sin(elapsedTime * 0.1) * 0.1;

      coreMesh.rotation.y = -elapsedTime * 0.15 * rotMultiplier;
      coreMesh.rotation.x = elapsedTime * 0.1 * rotMultiplier;
      const corePulse = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
      coreMesh.scale.set(corePulse, corePulse, corePulse);

      ringMesh.rotation.z = elapsedTime * 0.05 * rotMultiplier;
      ringMesh.rotation.y = Math.sin(elapsedTime * 0.2) * 0.3;

      // Camera responds to scroll and mouse parallax
      camera.position.x = mouse.x * 2.2;
      camera.position.y = mouse.y * 1.8 - scrollY * 0.005;
      camera.position.z = 24 + Math.sin(scrollY * 0.002) * 4;
      camera.lookAt(0, -scrollY * 0.003, 0);

      // Particle wave displacement
      if (isTurbulent) {
        const posAttr = particlesGeometry.attributes.position;
        const colAttr = particlesGeometry.attributes.color;
        const count = Math.min(particleCount, 800);

        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          const origX = originalPositions[idx];
          const origY = originalPositions[idx + 1];
          const origZ = originalPositions[idx + 2];

          const wave = Math.sin(elapsedTime * 1.5 + origX * 0.2 + origY * 0.2) * 0.35;
          posAttr.array[idx] = origX * (1 + wave * 0.1);
          posAttr.array[idx + 1] = origY * (1 + wave * 0.1);
          posAttr.array[idx + 2] = origZ * (1 + wave * 0.1);
        }
        posAttr.needsUpdate = true;

        // Dynamic plexus connecting lines
        if (showConnectionsRef.current) {
          let lineVertexCount = 0;
          const step = 4; // Check subset for 60fps performance
          const thresholdDistSq = 4.2;

          for (let i = 0; i < 90; i += step) {
            for (let j = i + 1; j < 90; j += step) {
              if (lineVertexCount >= maxLines) break;

              const dx = posAttr.array[i * 3] - posAttr.array[j * 3];
              const dy = posAttr.array[i * 3 + 1] - posAttr.array[j * 3 + 1];
              const dz = posAttr.array[i * 3 + 2] - posAttr.array[j * 3 + 2];
              const distSq = dx * dx + dy * dy + dz * dz;

              if (distSq < thresholdDistSq) {
                const pIdx = lineVertexCount * 6;
                linePositions[pIdx] = posAttr.array[i * 3];
                linePositions[pIdx + 1] = posAttr.array[i * 3 + 1];
                linePositions[pIdx + 2] = posAttr.array[i * 3 + 2];

                linePositions[pIdx + 3] = posAttr.array[j * 3];
                linePositions[pIdx + 4] = posAttr.array[j * 3 + 1];
                linePositions[pIdx + 5] = posAttr.array[j * 3 + 2];

                const alpha = 1.0 - (distSq / thresholdDistSq);
                lineColors[pIdx] = currentPrimaryColor.r * alpha;
                lineColors[pIdx + 1] = currentPrimaryColor.g * alpha;
                lineColors[pIdx + 2] = currentPrimaryColor.b * alpha;

                lineColors[pIdx + 3] = currentSecondaryColor.r * alpha;
                lineColors[pIdx + 4] = currentSecondaryColor.g * alpha;
                lineColors[pIdx + 5] = currentSecondaryColor.b * alpha;

                lineVertexCount++;
              }
            }
          }
          lineGeometry.setDrawRange(0, lineVertexCount * 2);
          lineGeometry.attributes.position.needsUpdate = true;
          lineGeometry.attributes.color.needsUpdate = true;
          lineSegments.visible = true;
        } else {
          lineSegments.visible = false;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount to maintain 60FPS
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      coreGeometry.dispose();
      coreWireframe.dispose();
      coreLineMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []); // Run once on mount

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, rgba(11, 19, 38, 0.45) 0%, rgba(3, 7, 18, 0.95) 80%, #030712 100%)'
      }}
    />
  );
}
