import type { IsNever } from "inferred-types/types";

type _Get<T, K, Acc = never> = K extends `${infer A}.${infer B}`
  ? A extends keyof T ? _Get<T[A], B, _Get<T[A], B>> : Acc
  : K extends keyof T ? _Get<T[K], K, T[K]> : Acc;

/**
 * **Get**`<TContainer,TDotPath,[TDefVal]>`
 *
 * Provides a type utility which allows reaching into
 * a container using a _dot path_ to get the type
 * somewhere inside the parent structure.
 */
export type Get<
  TContainer,
  TDotPath,
  TDefVal = undefined,
> = IsNever<_Get<TContainer, TDotPath>> extends true
  ? TDefVal
  : _Get<TContainer, TDotPath> extends undefined
    ? TDefVal
    : _Get<TContainer, TDotPath>;

