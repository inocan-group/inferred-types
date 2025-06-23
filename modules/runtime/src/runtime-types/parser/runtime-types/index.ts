export * from "./base";
export * from "./atomic";
export * from "./literal";
export * from "./container";
export * from "./object";

// Re-export the main runtime type union
import type { AtomicRuntimeType } from "./atomic";
import type { LiteralRuntimeType } from "./literal";
import type { ContainerRuntimeType } from "./container";
import type { ObjectRuntimeType } from "./object";

export type RuntimeType = 
  | AtomicRuntimeType<any>
  | LiteralRuntimeType<any>
  | ContainerRuntimeType<any>
  | ObjectRuntimeType<any>;

// Will be expanded with additional types in future phases:
// | UnionRuntimeType<any>
// | IntersectionRuntimeType<any>