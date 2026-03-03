"use client";

import type { ComponentProps } from "react";
import { Canvas } from "@react-three/fiber";

/** Typed as JSX component so React 19's Element | null return type is satisfied. */
const R3FCanvas = Canvas as React.JSXElementConstructor<
  ComponentProps<typeof Canvas> & { children?: React.ReactNode }
>;

function PlaceholderMesh() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#9995e6" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <R3FCanvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <PlaceholderMesh />
      </R3FCanvas>
    </div>
  );
}