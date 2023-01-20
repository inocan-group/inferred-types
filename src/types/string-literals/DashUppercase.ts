import { HasUppercase } from "./HasUppercase";

type _DU<T extends string> = T extends Lowercase<T> ? T : `-${Lowercase<T>}`;

/**
 * Converts uppercase characters to a dash and then the lowercase equivalent
 * ```ts
 * // "one-two-three"
 * type T = DashUppercase<"oneTwoThree">;
 * ```
 * 
 * _Intended to be used as a lower level utility; prefer `Dasherize<T>` for more full-fledged
 * dash solution_.
 */
export type DashUppercase<T extends string> = HasUppercase<T> extends false ? T :
  T extends `${infer C0}${infer C1}${infer R}` ?
  `${_DU<C0>}${_DU<C1>}${DashUppercase<R>}` :
  T extends `${infer C0}${infer R}` ? `${_DU<C0>}${DashUppercase<R>}` :
  "";
