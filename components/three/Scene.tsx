"use client";

import type { ComponentProps } from "react";
import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

/** Typed as JSX component so React 19's Element | null return type is satisfied. */
const R3FCanvas = Canvas as React.JSXElementConstructor<
  ComponentProps<typeof Canvas> & { children?: React.ReactNode }
>;


function ThreeDMesh() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meshRef = useRef<any>(null);
  const texture = useTexture("/image/3d.png");


  const rawMouse = useRef({ x: 0, y: 0 });
  const lerpedMouse = useRef({ x: 0, y: 0 });

  const rawScroll = useRef(0);
  const lerpedScroll = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      rawMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      rawScroll.current = Math.min(window.scrollY / window.innerHeight, 1);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { viewport } = state;

    // ── Lerp both inputs ─────────────────────────────────────────
    lerpedMouse.current.x += (rawMouse.current.x - lerpedMouse.current.x) * 0.05;
    lerpedMouse.current.y += (rawMouse.current.y - lerpedMouse.current.y) * 0.05;
    lerpedScroll.current += (rawScroll.current - lerpedScroll.current) * 0.08;

    const { x: mx, y: my } = lerpedMouse.current;
    const sp = lerpedScroll.current; // 0 → 1

    // ── Base position (bottom-right corner) ──────────────────────
    const baseX = viewport.width * 0.38;
    const baseY = -viewport.height * 0.18;

    // ── Cursor: position drift + 3-D tilt ────────────────────────
    meshRef.current.position.x = baseX + mx * 0.55;
    meshRef.current.position.y = baseY + my * 0.35;

    meshRef.current.rotation.y = mx * 0.45;
    meshRef.current.rotation.x = -my * 0.3;

    // ── Scroll zoom parallax ──────────────────────────────────────
    // Scale grows from 1 → 2 as the hero scrolls fully out.
    const zoomScale = 1 + sp * 1.0;
    meshRef.current.scale.set(zoomScale, zoomScale, zoomScale);

    // Also push the mesh toward the camera (Z+) for added depth.
    meshRef.current.position.z = sp * 2.0;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3.5, 3.5]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <R3FCanvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ThreeDMesh />
        </Suspense>
      </R3FCanvas>
    </div>
  );
}
