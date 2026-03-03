/**
 * Augment React JSX with React Three Fiber primitives (mesh, meshStandardMaterial, etc.).
 * Merges with React's JSX.IntrinsicElements from @types/react so div and other HTML
 * elements remain; we only add R3F elements.
 */
import type { ThreeElements } from "@react-three/fiber";

declare module "react" {
  namespace JSX {
    // Empty body is intentional for declaration merging; do not add members.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends ThreeElements {}
  }
}
