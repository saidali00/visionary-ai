import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, OrbitControls, Float, Sphere, Trail, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, Cpu, Rocket, Sparkles, Atom, Orbit } from "lucide-react";
import * as THREE from "three";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "The New World — Xenonymous" },
      {
        name: "description",
        content:
          "Step into the Xenonymous gateway: a 3D voyage through planets, alien intelligence, and the future of AI.",
      },
      { property: "og:title", content: "The New World — Xenonymous" },
      {
        property: "og:description",
        content: "Planets, aliens, and the architecture of tomorrow's intelligence.",
      },
    ],
  }),
  component: ExperiencePage,
});

/* ---------- 3D scene primitives ---------- */

function Planet() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          color="#1e3a8a"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          roughness={0.4}
          metalness={0.6}
          wireframe={false}
        />
      </mesh>
      {/* Atmospheric ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.4, 0.04, 16, 100]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 1.7, 0.3, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>
    </Float>
  );
}

function Alien({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8) * 0.2;
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.5;
    }
  });
  return (
    <group ref={ref} position={position}>
      {/* head */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      {/* eyes */}
      <mesh position={[-0.12, 0.05, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, 0.05, 0.3]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      {/* body */}
      <mesh position={[0, -0.55, 0]}>
        <coneGeometry args={[0.25, 0.6, 8]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

function OrbitingNode({
  radius,
  speed,
  color,
  size = 0.1,
  offset = 0,
  yTilt = 0,
}: {
  radius: number;
  speed: number;
  color: string;
  size?: number;
  offset?: number;
  yTilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.5) * yTilt;
    }
  });
  return (
    <Trail width={1} length={6} color={color} attenuation={(t) => t * t}>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[-5, -3, -5]} intensity={1} color="#a855f7" />
      <pointLight position={[0, 5, -5]} intensity={0.8} color="#ec4899" />

      <Stars radius={80} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Planet />

      <Alien position={[3, 0.5, 0]} />
      <Alien position={[-3, -0.3, 1]} />

      <OrbitingNode radius={3.4} speed={0.6} color="#22d3ee" yTilt={0.5} />
      <OrbitingNode radius={4.0} speed={0.4} color="#a855f7" offset={2} yTilt={1} />
      <OrbitingNode radius={4.6} speed={0.3} color="#ec4899" offset={4} yTilt={0.3} />
      <OrbitingNode radius={5.2} speed={0.25} color="#f59e0b" offset={1} yTilt={0.8} />

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Text
          position={[0, 3.2, 0]}
          fontSize={0.5}
          color="#22d3ee"
          anchorX="center"
          anchorY="middle"
        >
          XENONYMOUS
        </Text>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 2.8}
      />
    </>
  );
}

/* ---------- Page ---------- */

const concepts = [
  {
    icon: Brain,
    title: "Synthetic Cognition",
    text: "Models that reason like minds — not lookup tables. Multi-step thinking, self-correction, real understanding.",
  },
  {
    icon: Atom,
    title: "Quantum-Ready",
    text: "Architectures designed for the post-classical era. Entangled inference. Probabilistic creativity.",
  },
  {
    icon: Rocket,
    title: "Interplanetary Scale",
    text: "Compute that spans continents today, planets tomorrow. Edge-deployed intelligence everywhere humans go.",
  },
  {
    icon: Cpu,
    title: "Neural Co-Processors",
    text: "AI that lives in your loop — co-piloting thought, code, and creation in real time.",
  },
  {
    icon: Orbit,
    title: "Autonomous Agents",
    text: "Goal-driven entities that plan, execute, and adapt. Always on. Always learning.",
  },
  {
    icon: Sparkles,
    title: "Generative Reality",
    text: "Worlds, characters, and stories materialized from pure intent. Imagination becomes infrastructure.",
  },
];

function ExperiencePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* 3D canvas as fixed background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 1.5, 8], fov: 55 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Atmospheric overlays */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 90%)",
        }}
        aria-hidden
      />

      {/* Back link */}
      <div className="relative z-20 px-6 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full glass glass-hover px-4 py-2 text-xs font-semibold text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Return home
        </Link>
      </div>

      {/* Hero */}
      <section className="relative z-20 flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs font-semibold tracking-[0.5em] text-primary mb-4"
        >
          GATEWAY · ACCEPTED
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05]"
        >
          Welcome to the
          <br />
          <span className="text-gradient">New World</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-2xl text-lg text-muted-foreground"
        >
          A planet of synthetic minds. Aliens of pure logic. Stars made of data.
          This is the future Xenonymous is engineering — interactive, alive, and
          waiting for you.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-6 text-xs text-muted-foreground/70"
        >
          Drag to rotate · Pinch to explore
        </motion.p>
      </section>

      {/* Concepts */}
      <section className="relative z-20 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-semibold tracking-[0.4em] text-primary mb-3">
              ARCHITECTURES OF TOMORROW
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Six pillars of <span className="text-gradient">future intelligence</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {concepts.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass rounded-2xl p-7"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(34,211,238,0.06), rgba(168,85,247,0.04))",
                }}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand glow mb-5">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-20 px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-3xl glass rounded-3xl p-10 md:p-14 text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            The future <span className="text-gradient">is already here</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start building with WadiAI — the engine powering this new world.
          </p>
          <a
            href="https://wadiai.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-primary-foreground glow"
          >
            Enter WadiAI
          </a>
        </motion.div>
      </section>
    </div>
  );
}
