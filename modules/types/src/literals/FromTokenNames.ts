import type { ObjectKey } from "../base-types/ObjectKey";
import type { IsNever } from "../boolean-logic/operators/IsNever";

export type WideTokenNames = "string"
  | "number"
  | "boolean"
  | "null"
  | "undefined"
  | "never"
  | "unknown"
  | "string[]"
  | "number[]"
  | "boolean[]"
  | "unknown[]";

export type ConvertWideTokenNames<T extends WideTokenNames> = T extends "string"
  ? string
  : T extends "number"
    ? number
    : T extends "boolean"
      ? boolean
      : T extends "null"
        ? null
        : T extends "undefined"
          ? undefined
          : T extends "never"
            ? never
            : T extends "unknown"
              ? unknown
              : T extends "string[]"
                ? string[]
                : T extends "number[]"
                  ? number[]
                  : T extends "boolean[]"
                    ? boolean[]
                    : T extends "unknown[]"
                      ? unknown[]
                      : never;

export type WideContainerNames = "object"
  | "Dictionary"
  | "Map"
  | "Set"
  | "WeakMap";

type ConvertWideContainerNames<T extends WideContainerNames> = T extends "object"
  ? object
  : T extends "Dictionary"
    ? Record<ObjectKey, unknown>
    : T extends "Map"
      ? Map<unknown, unknown>
      : T extends "Set"
        ? Set<unknown>
        : T extends "WeakMap"
          ? WeakMap<object, unknown>
          : never;

/**
 * **FromWideTokens**`<T, [TElse]>`
 *
 * Looks for `WideContainerNames` or `WideTokenNames` and converts them to
 * the type they describe. If it is `T` is not any of these tokens it is
 * simply proxied through.
 *
 * If you'd prefer to setup a different type for when no token is matched
 * you can add it under `TElse`.
 */
export type FromWideTokens<
  T,
  TElse = never,
> = T extends WideTokenNames | WideContainerNames
  ? T extends WideTokenNames
    ? ConvertWideTokenNames<T>
    : T extends WideContainerNames
      ? ConvertWideContainerNames<T>
      : never
  : IsNever<TElse> extends true
    ? T
    : TElse;
