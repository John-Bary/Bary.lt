// components/Interactive3DCards.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, RoundedBox } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function Card3D({ position, color, title, index }: {
  position: [number, number, number];
  color: string;
  title: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1}>
      <group position={position}>
        <RoundedBox
          ref={meshRef}
          args={[2, 2.5, 0.1]}
          radius={0.1}
          smoothness={4}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={hovered ? "#ffffff" : color}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            metalness={0.5}
            roughness={0.3}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </group>
    </Float>
  );
}

export default function Interactive3DCards() {
  const cards = [
    { title: "Design", color: "#8b5cf6" },
    { title: "Develop", color: "#06b6d4" },
    { title: "Deploy", color: "#ec4899" },
  ];

  return (
    <section className="h-screen relative">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {cards.map((card, i) => (
            <Card3D
              key={i}
              position={[(i - 1) * 3, 0, 0]}
              color={card.color}
              title={card.title}
              index={i}
            />
          ))}
        </Canvas>
      </div>
    </section>
  );
}