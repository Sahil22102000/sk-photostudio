import { useFrame } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import type { Mesh } from "three";

type ShapeType = "icosahedron" | "torusKnot" | "torus";

interface InteractiveShapeProps {
  shape: ShapeType;
  position: [number, number, number];
  baseColor: string;
  altColor: string;
  baseSpeed: number;
  /** Uniform scale multiplier — defaults to 1 */
  scale?: number;
}

export default function InteractiveShape({
  shape,
  position,
  baseColor,
  altColor,
  baseSpeed,
  scale = 1,
}: InteractiveShapeProps) {
  const meshRef = useRef<Mesh>(null);
  const scaleRef = useRef(scale);
  const speedRef = useRef(baseSpeed);
  const colorRef = useRef(new THREE.Color(baseColor));
  const targetColor = useRef(new THREE.Color(baseColor));
  const burstRef = useRef(false);
  const burstTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [, forceUpdate] = useState(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Torus spins differently for aperture effect
    if (shape === "torus") {
      meshRef.current.rotation.x += delta * speedRef.current * 0.5;
      meshRef.current.rotation.z += delta * speedRef.current;
    } else {
      meshRef.current.rotation.x += delta * speedRef.current * 0.7;
      meshRef.current.rotation.y += delta * speedRef.current;
      meshRef.current.rotation.z += delta * speedRef.current * 0.3;
    }

    colorRef.current.lerp(targetColor.current, 0.08);
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.color.copy(colorRef.current);

    speedRef.current += (baseSpeed - speedRef.current) * 0.03;

    const targetScale = burstRef.current ? scale * 1.35 : scale;
    scaleRef.current += (targetScale - scaleRef.current) * 0.12;
    meshRef.current.scale.setScalar(scaleRef.current);
  });

  const handleInteract = useCallback(() => {
    speedRef.current = baseSpeed * 5;
    targetColor.current = new THREE.Color(altColor);
    burstRef.current = true;

    if (burstTimeout.current) clearTimeout(burstTimeout.current);
    burstTimeout.current = setTimeout(() => {
      targetColor.current = new THREE.Color(baseColor);
      burstRef.current = false;
    }, 600);

    forceUpdate((n) => n + 1);
  }, [baseColor, altColor, baseSpeed]);

  const geometry = (() => {
    if (shape === "icosahedron") {
      return <icosahedronGeometry args={[1.1, 1]} />;
    }
    if (shape === "torus") {
      // tube radius is thinner for aperture ring appearance
      return <torusGeometry args={[1.0, 0.06, 12, 80]} />;
    }
    // torusKnot
    return <torusKnotGeometry args={[0.75, 0.25, 120, 16, 2, 3]} />;
  })();

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: R3F mesh is a WebGL object, not a DOM element
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleInteract}
      onPointerDown={handleInteract}
    >
      {geometry}
      <meshBasicMaterial
        color={baseColor}
        wireframe={shape !== "torus"}
        transparent
        opacity={shape === "torus" ? 0.95 : 0.82}
      />
    </mesh>
  );
}
