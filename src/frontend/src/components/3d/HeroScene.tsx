import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import InteractiveShape from "./InteractiveShape";
import ParticleBurst from "./ParticleBurst";

// Warm amber palette — photography studio aesthetic (light mode)
const AMBER = "#c47a00";
const GOLD = "#e8a820";
const CREAM = "#f5e6c0";

function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouseX * 1.0 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function SceneContent({
  burst1Active,
  burst2Active,
}: {
  burst1Active: boolean;
  burst2Active: boolean;
}) {
  return (
    <>
      {/* Warm ambient light — no harsh directional */}
      <ambientLight intensity={0.7} color="#fff8ee" />
      <pointLight position={[4, 4, 4]} intensity={1.2} color={AMBER} />
      <pointLight position={[-4, -3, 3]} intensity={0.8} color={GOLD} />
      <pointLight position={[0, 0, 6]} intensity={0.5} color={CREAM} />

      {/* Outer aperture ring — large torus */}
      <InteractiveShape
        shape="torus"
        position={[0, 0, -0.5]}
        baseColor={AMBER}
        altColor={GOLD}
        baseSpeed={0.18}
        scale={2.2}
      />
      {/* Inner lens ring — smaller torus, opposite spin */}
      <InteractiveShape
        shape="torus"
        position={[0, 0, 0]}
        baseColor={GOLD}
        altColor={CREAM}
        baseSpeed={-0.28}
        scale={1.3}
      />
      {/* Central icosahedron — camera shutter */}
      <InteractiveShape
        shape="icosahedron"
        position={[0, 0, 0.5]}
        baseColor={CREAM}
        altColor={AMBER}
        baseSpeed={0.22}
        scale={0.75}
      />

      {/* Particle bursts attached to outer ring */}
      <group position={[0, 0, 0]}>
        <ParticleBurst
          active={burst1Active}
          color={AMBER}
          count={60}
          spread={3.5}
        />
        <ParticleBurst
          active={burst2Active}
          color={GOLD}
          count={40}
          spread={2.5}
        />
      </group>
    </>
  );
}

interface HeroSceneProps {
  className?: string;
}

export default function HeroScene({ className = "" }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [burst1Active, setBurst1Active] = useState(false);
  const [burst2Active, setBurst2Active] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  const triggerBurst = useCallback(() => {
    setBurst1Active(true);
    setTimeout(() => setBurst1Active(false), 700);
    setTimeout(() => {
      setBurst2Active(true);
      setTimeout(() => setBurst2Active(false), 600);
    }, 150);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={triggerBurst}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") triggerBurst();
      }}
      role="img"
      aria-label="Interactive 3D camera aperture — click to trigger burst animation"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <CameraRig mouseX={mousePos.x} mouseY={mousePos.y} />
        <SceneContent burst1Active={burst1Active} burst2Active={burst2Active} />
      </Canvas>
    </div>
  );
}
