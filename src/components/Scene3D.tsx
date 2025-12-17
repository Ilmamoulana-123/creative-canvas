import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  rotationSpeed?: number;
  shape?: "box" | "sphere" | "octahedron" | "torus" | "dodecahedron";
}

const FloatingShape = ({
  position,
  color,
  scale = 1,
  speed = 1,
  rotationSpeed = 0.5,
  shape = "box",
}: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * rotationSpeed;
      meshRef.current.rotation.y += 0.005 * rotationSpeed;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "sphere":
        return <sphereGeometry args={[0.6, 32, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.7]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.6]} />;
      default:
        return <boxGeometry args={[0.8, 0.8, 0.8]} />;
    }
  }, [shape]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Scene3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      className="!absolute !inset-0 !-z-[5]"
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FF6B6B" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#845EC2" />

      {/* Photoshop-inspired shape - top left */}
      <FloatingShape
        position={[-4, 2, -1]}
        color="#FF6B6B"
        scale={0.7}
        shape="box"
        rotationSpeed={0.3}
      />

      {/* Illustrator-inspired shape - top right */}
      <FloatingShape
        position={[4, 1.5, 0]}
        color="#845EC2"
        scale={0.8}
        shape="sphere"
        speed={1.2}
      />

      {/* Creative shape - bottom left */}
      <FloatingShape
        position={[-3, -2, 1]}
        color="#FFB86C"
        scale={0.5}
        shape="octahedron"
        speed={0.8}
      />

      {/* Design tool shape - bottom right */}
      <FloatingShape
        position={[3.5, -1.5, -1]}
        color="#4ECDC4"
        scale={0.6}
        shape="torus"
        rotationSpeed={0.6}
      />

      {/* Extra floating element - far top */}
      <FloatingShape
        position={[0, 3.5, -2]}
        color="#FF6B9D"
        scale={0.4}
        shape="dodecahedron"
        speed={1.5}
      />
    </Canvas>
  );
};

export default Scene3D;
