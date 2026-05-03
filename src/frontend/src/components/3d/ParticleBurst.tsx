import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";

interface ParticleBurstProps {
  count?: number;
  spread?: number;
  /** Warm amber/gold by default for photography theme */
  color?: string;
  active?: boolean;
}

export default function ParticleBurst({
  count = 40,
  spread = 2.5,
  color = "#c47a00",
  active = false,
}: ParticleBurstProps) {
  const pointsRef = useRef<Points>(null);
  const velocitiesRef = useRef<Float32Array>(new Float32Array(count * 3));
  const timeRef = useRef(0);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 0.1;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      const speed = (0.5 + Math.random() * 1.5) * spread * 0.4;
      vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      vel[i * 3 + 2] = Math.cos(phi) * speed;
    }
    velocitiesRef.current = vel;
    timeRef.current = 0;
    return pos;
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !active) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    timeRef.current += delta;
    const t = timeRef.current;

    for (let i = 0; i < count; i++) {
      const vx = velocitiesRef.current[i * 3];
      const vy = velocitiesRef.current[i * 3 + 1];
      const vz = velocitiesRef.current[i * 3 + 2];
      posAttr.setXYZ(
        i,
        vx * t * (1 - t * 0.5),
        vy * t * (1 - t * 0.5),
        vz * t * (1 - t * 0.5),
      );
    }
    posAttr.needsUpdate = true;
    const mat = pointsRef.current.material as { opacity: number };
    mat.opacity = Math.max(0, 1 - t * 1.5);
  });

  if (!active) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.08}
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
