import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Environment, Sphere, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
    color: string;
}

const MarbleSphere = ({ color, ...props }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <Sphere args={[1, 64, 64]} {...props} ref={meshRef}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.1}
          roughness={0.4}
          distort={0.4}
          speed={2}
        />
      </Sphere>
    </Float>
  );
};

const AccentShape = ({ color, ...props }: any) => {
   const meshRef = useRef<THREE.Mesh>(null);
   useFrame((state) => {
    if (meshRef.current) {
       meshRef.current.rotation.z += 0.01;
    }
   })

   return (
    <Float speed={4} rotationIntensity={2} floatIntensity={1}>
        <mesh ref={meshRef} {...props}>
            <torusGeometry args={[0.8, 0.2, 16, 50]} />
             <meshStandardMaterial 
                color={color} 
                roughness={0.2} 
                metalness={0.8}
                emissive={color}
                emissiveIntensity={0.2}
            />
        </mesh>
    </Float>
   )
}

const SceneContent = ({ color }: { color: string }) => {
    return (
        <>
            <MarbleSphere position={[0, 0, 0]} scale={2.2} color={color} />
            <AccentShape position={[2, 1, -1]} rotation={[Math.PI / 4, 0, 0]} color={color} />
            <AccentShape position={[-2, -1.5, -0.5]} scale={0.6} rotation={[-Math.PI / 3, 0, 0]} color={color} />
            
            <Environment preset="studio" />
            
            {/* Custom Lighting to enhance marble look */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} color={color} />
            
            {/* Lightformers for reflections */}
            <group position={[0, 5, 0]}>
                <Lightformer form="rect" intensity={5} position={[2, 0, 0]} scale={[3, 1, 1]} target={[0, 0, 0]} />
                <Lightformer form="rect" intensity={5} position={[-2, 0, 0]} scale={[3, 1, 1]} target={[0, 0, 0]} />
            </group>
        </>
    )
}

const ThreeScene: React.FC<SceneProps> = ({ color }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <SceneContent color={color} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;