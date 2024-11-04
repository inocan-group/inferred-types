import { Trim, TrimLeft, TrimRight } from "src/types/index";

/**
 * **trim**(input)
 * 
 * A runtime utility which trims whitespace on both sides of a string
 * and returns a type-strong string literal where possible.
 */
export function trim<T extends string>(input: T): Trim<T> {
  return input.trim() as Trim<T>;
}

/**
 * **trimLeft**(input)
 * 
 * A runtime utility which trims whitespace on the leading/left side of a string
 * and returns a type-strong string literal where possible.
 * 
 * @deprecated prefer use of `trimStart` instead
 */
export function trimLeft<T extends string>(input: T): TrimLeft<T> {
  return input.trimStart() as TrimLeft<T>;
}

/**
 * **trimStart**(input)
 * 
 * A runtime utility which trims whitespace on the leading/left side of a string
 * and returns a type-strong string literal where possible.
 */
export function trimStart<T extends string>(input: T): TrimLeft<T> {
  return input.trimStart() as TrimLeft<T>;
}

/**
 * **trimRight**(input)
 * 
 * A runtime utility which trims whitespace on the tailing/right side of a string
 * and returns a type-strong string literal where possible.
 * 
 * @deprecated prefer use of `trimEnd` instead
 */
export function trimRight<T extends string>(input: T): TrimRight<T> {
  return input.trimEnd() as TrimRight<T>;
}

/**
 * **trimEnd**(input)
 * 
 * A runtime utility which trims whitespace on the tailing/right side of a string
 * and returns a type-strong string literal where possible.
 */
export function trimEnd<T extends string>(input: T): TrimRight<T> {
  return input.trimEnd() as TrimRight<T>;
}
