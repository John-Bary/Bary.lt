"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useThemeStore } from "@/lib/store";

// Interactive grid plane
function Grid() {
  const { isDark } = useThemeStore();
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Shader for the grid
  const shaderData = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color(isDark ? "#8b5cf6" : "#6366f1") },
      uColor2: { value: new THREE.Color(isDark ? "#06b6d4" : "#0ea5e9") },
      uOpacity: { value: isDark ? 0.4 : 0.3 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vElevation;
      uniform float uTime;
      uniform vec2 uMouse;
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Distance from mouse
        float dist = distance(uv, uMouse * 0.5 + 0.5);
        
        // Wave effect
        float wave = sin(pos.x * 2.0 + uTime * 0.5) * 0.15;
        wave += sin(pos.y * 2.0 + uTime * 0.3) * 0.15;
        
        // Mouse interaction - creates a bump near cursor
        float mouseBump = smoothstep(0.4, 0.0, dist) * 0.8;
        
        pos.z += wave + mouseBump;
        vElevation = pos.z;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vElevation;
      uniform vec3 uColor;
      uniform vec3 uColor2;
      uniform float uOpacity;
      uniform float uTime;
      
      void main() {
        // Grid lines
        float gridX = abs(fract(vUv.x * 20.0 - 0.5) - 0.5) / fwidth(vUv.x * 20.0);
        float gridY = abs(fract(vUv.y * 20.0 - 0.5) - 0.5) / fwidth(vUv.y * 20.0);
        float grid = 1.0 - min(min(gridX, gridY), 1.0);
        
        // Color gradient based on position and elevation
        vec3 color = mix(uColor, uColor2, vUv.x + vElevation * 0.5);
        
        // Fade edges
        float fadeX = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
        float fadeY = smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
        float fade = fadeX * fadeY;
        
        // Glow effect on elevated areas
        float glow = smoothstep(0.0, 0.5, vElevation) * 0.3;
        
        float alpha = (grid * 0.8 + glow) * fade * uOpacity;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
  }), [isDark]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouse.x, mouse.y),
        0.05
      );
      // Update colors when theme changes
      materialRef.current.uniforms.uColor.value.set(isDark ? "#8b5cf6" : "#6366f1");
      materialRef.current.uniforms.uColor2.value.set(isDark ? "#06b6d4" : "#0ea5e9");
      materialRef.current.uniforms.uOpacity.value = isDark ? 0.4 : 0.3;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.5, 0, 0]}
      position={[0, -2, 0]}
    >
      <planeGeometry args={[25, 25, 50, 50]} />
      <shaderMaterial
        ref={materialRef}
        {...shaderData}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating grid points/nodes
function GridNodes({ count = 30 }) {
  const { isDark } = useThemeStore();
  const points = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={isDark ? "#a78bfa" : "#818cf8"}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Vertical accent lines
function AccentLines() {
  const { isDark } = useThemeStore();
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      x: (i - 2) * 4,
      height: 3 + Math.random() * 4,
      delay: i * 0.5,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const line = child as THREE.Mesh;
        const baseY = -1 + Math.sin(state.clock.elapsedTime * 0.5 + lines[i].delay) * 0.3;
        line.position.y = baseY;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.x, 0, -8]}>
          <boxGeometry args={[0.02, line.height, 0.02]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? (isDark ? "#8b5cf6" : "#6366f1") : (isDark ? "#06b6d4" : "#0ea5e9")}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// Horizontal scan line effect
function ScanLine() {
  const { isDark } = useThemeStore();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Move from bottom to top, then reset
      const cycle = (state.clock.elapsedTime * 0.3) % 1;
      meshRef.current.position.y = -5 + cycle * 12;
      
      // Fade based on position
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.15 * Math.sin(cycle * Math.PI);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[30, 0.05]} />
      <meshBasicMaterial
        color={isDark ? "#8b5cf6" : "#6366f1"}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function GridScene() {
  const { isDark } = useThemeStore();

  return (
    <>
      <color attach="background" args={[isDark ? "#050208" : "#f8fafc"]} />
      
      {/* Main grid */}
      <Grid />
      
      {/* Floating nodes */}
      <GridNodes count={25} />
      
      {/* Accent lines */}
      <AccentLines />
      
      {/* Scan line */}
      <ScanLine />
      
      {/* Subtle ambient light */}
      <ambientLight intensity={0.5} />
    </>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        <GridScene />
      </Suspense>
    </Canvas>
  );
}