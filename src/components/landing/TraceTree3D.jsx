import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import { OrbitControls, Html, Float, Line } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Animated particles rising through the scene ─── */
const DataStream = ({ position, color, governedColor, shieldY = 0, count = 20 }) => {
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 0.5,
      z: (Math.random() - 0.5) * 0.5,
      y: Math.random() * 10 - 5,
      speed: 0.6 + Math.random() * 1.0,
      scale: 0.03 + Math.random() * 0.04,
    }));
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    particles.forEach((p, i) => {
      p.y += p.speed * delta;
      if (p.y > 5) p.y = -5;

      dummy.position.set(
        position[0] + p.x,
        position[1] + p.y,
        position[2] + p.z
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);

      // Change color when crossing the shield plane (y=0)
      tempColor.set(p.y > shieldY ? governedColor : color);
      ref.current.setColorAt(i, tempColor);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
};

/* ─── A single stream pillar with label ─── */
const StreamPillar = ({ position, label, color = '#ef4444', governedColor = '#22c55e' }) => {
  const tubeRef = useRef();

  useFrame((state) => {
    if (tubeRef.current) {
      tubeRef.current.material.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.03;
    }
  });

  return (
    <group position={position}>
      {/* Faint vertical tube */}
      <mesh ref={tubeRef}>
        <cylinderGeometry args={[0.12, 0.12, 10, 12, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Bottom ring marker */}
      <mesh position={[0, -5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.2, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Top ring marker (governed) */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.2, 24]} />
        <meshBasicMaterial color={governedColor} transparent opacity={0.5} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Stream label at bottom */}
      <Html position={[0, -5.8, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div style={{
          color: color,
          fontSize: '8px',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          whiteSpace: 'nowrap',
          opacity: 0.85,
          textShadow: `0 0 8px ${color}`,
        }}>
          {label}
        </div>
      </Html>

      {/* Particles */}
      <DataStream position={[0, 0, 0]} color={color} governedColor={governedColor} shieldY={0} count={20} />
    </group>
  );
};

/* ─── Central hexagonal shield membrane ─── */
const ShieldMembrane = () => {
  const groupRef = useRef();
  const pulseRef = useRef();
  const scanRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
    if (pulseRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
      pulseRef.current.scale.set(s, 1, s);
      pulseRef.current.material.opacity = 0.05 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
    }
    if (scanRef.current) {
      const sweep = Math.sin(state.clock.elapsedTime * 0.7) * 3.5;
      scanRef.current.position.x = sweep;
      scanRef.current.material.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        {/* Primary shield — flat hexagon */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[3.8, 3.8, 0.04, 6]} />
          <meshStandardMaterial
            color="#0c1a3d"
            emissive="#1e40af"
            emissiveIntensity={0.4}
            transparent
            opacity={0.15}
            roughness={0.2}
            metalness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Wireframe overlay */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[3.85, 3.85, 0.04, 6]} />
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.45} toneMapped={false} />
        </mesh>

        {/* Inner hex ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 8, 6]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} toneMapped={false} />
        </mesh>

        {/* Outer hex ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.8, 0.025, 8, 6]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} toneMapped={false} />
        </mesh>

        {/* Extra detail ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.2, 0.012, 8, 6]} />
          <meshBasicMaterial color="#1d4ed8" transparent opacity={0.35} toneMapped={false} />
        </mesh>
      </group>

      {/* Pulse ring (doesn't rotate with the shield itself) */}
      <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.5, 4.3, 6]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.06} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {/* Center glow spot */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.0, 32]} />
        <meshBasicMaterial color="#1d4ed8" transparent opacity={0.15} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Scanning line */}
      <mesh ref={scanRef} position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.025, 7.5]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Shield label */}
      <Html position={[0, 0.8, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(59, 130, 246, 0.35)',
          borderRadius: '4px',
          padding: '4px 12px',
          color: '#93c5fd',
          fontSize: '10px',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(4px)',
          textShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
        }}>
          ◆ AgentEval ◆
        </div>
      </Html>
    </group>
  );
};

/* ─── Floating annotation labels in 3D space ─── */
const FloatingLabel = ({ position, text, color = '#93c5fd', icon = '⬡', target }) => (
  <group>
    {target && (
      <Line
        points={[position, target]}
        color={color}
        lineWidth={1.5}
        transparent
        opacity={0.35}
        dashed
        dashScale={2}
        dashSize={0.2}
        gapSize={0.1}
      />
    )}
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.4} floatingRange={[-0.08, 0.08]}>
      <Html position={position} center distanceFactor={14} style={{ pointerEvents: 'none' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: 'rgba(2, 6, 23, 0.65)',
          border: `1px solid ${color}30`,
          borderRadius: '3px',
          padding: '3px 8px',
          color: color,
          fontSize: '8px',
          fontFamily: 'monospace',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(6px)',
        }}>
          <span style={{ fontSize: '10px' }}>{icon}</span>
          {text}
        </div>
      </Html>
    </Float>
  </group>
);

/* ─── Ambient background particles ─── */
const BackgroundDust = ({ count = 40 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#475569"
        size={0.04}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};


/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════ */
export default function TraceTree3D() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "400px" });

  return (
    <div
      ref={containerRef}
      className={`w-full relative transition-all duration-500 rounded-xl overflow-hidden`}
      style={{ height: '750px' }}
      data-lenis-prevent="true"
    >
      {/* ── Header overlay ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-4 pointer-events-none">
        <div>
          <h3 className="text-xl font-bold font-heading text-white tracking-wide">
            Active Governance Layer
          </h3>
          <p className="text-slate-500 text-xs font-tech tracking-[0.2em] mt-1">
            REAL-TIME TRACE INTERCEPTION MEMBRANE
          </p>
        </div>
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-tech uppercase tracking-widest rounded flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[ping_1.5s_infinite]"></span>
            Shield Active
          </div>
        </div>
      </div>

      {/* ── 3D Canvas ── */}
      <Canvas
        camera={{ position: [0, 3.5, 9], fov: 50 }}
        frameloop={isInView ? 'always' : 'demand'}
        dpr={[1, 1.5]} /* Limit max DPR for performance */
      >
        {/* Lighting */}
        <ambientLight intensity={0.25} />
        <pointLight position={[6, 8, 5]} intensity={0.7} color="#3b82f6" />
        <pointLight position={[-6, -4, 4]} intensity={0.4} color="#6366f1" />
        <pointLight position={[0, -6, -4]} intensity={0.3} color="#0ea5e9" />

        {/* Central hex shield */}
        <ShieldMembrane />

        {/* Data stream pillars — positioned around the shield */}
        <StreamPillar position={[-3.2, 0, -0.8]} label="Agent Trace α" color="#ef4444" governedColor="#22c55e" />
        <StreamPillar position={[-1.3, 0, 2.0]} label="Agent Trace β" color="#f97316" governedColor="#22c55e" />
        <StreamPillar position={[1.3, 0, 2.0]} label="Agent Trace γ" color="#eab308" governedColor="#22c55e" />
        <StreamPillar position={[3.2, 0, -0.8]} label="Agent Trace δ" color="#ec4899" governedColor="#22c55e" />
        <StreamPillar position={[0, 0, -2.8]} label="Agent Trace ε" color="#a855f7" governedColor="#22c55e" />

        {/* Floating 3D labels with HUD connecting lines pointing at pillars/shield */}
        <FloatingLabel position={[-5, 3, 0]} target={[-3.2, 0.5, -0.8]} text="Intercept" icon="⚡" color="#f87171" />
        <FloatingLabel position={[5, 3, 0]} target={[3.2, 0.5, -0.8]} text="Scan" icon="◎" color="#60a5fa" />
        <FloatingLabel position={[-4.8, -2.5, 1]} target={[-1.3, -0.2, 2.0]} text="Detect PII" icon="⬡" color="#fbbf24" />
        <FloatingLabel position={[4.8, -2.5, 1]} target={[1.3, -0.2, 2.0]} text="Govern" icon="◈" color="#34d399" />
        <FloatingLabel position={[0, 4.5, -1]} target={[0, 0.5, -0.5]} text="Shield Enforced" icon="▣" color="#818cf8" />

        {/* Background particles */}
        <BackgroundDust count={40} />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* ── Footer overlays ── */}
      <div className="absolute bottom-3 right-4 z-20 text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded backdrop-blur-md border border-white/10 pointer-events-none shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        ↔ Scroll & Drag to explore
      </div>
      <div className="absolute bottom-3 left-4 z-20 flex items-center gap-3">
        <div className="text-[10px] font-mono text-slate-300 bg-slate-900/80 px-2 py-1 rounded backdrop-blur-md border border-emerald-500/20 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          5 streams governed
        </div>
        <div className="text-[10px] font-mono text-slate-300 bg-slate-900/80 px-2 py-1 rounded backdrop-blur-md border border-blue-500/20 shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          membrane active
        </div>
      </div>
    </div>
  );
}
