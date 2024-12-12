import type {
  AsNarrowingFn,
  SimpleToken,
  SimpleType,
  TypedFunction,
} from "inferred-types/types";

/**
 * **isFnWithDict**(input)
 *
 * Type guard which checks whether a give variable is a function
 * which contains at least one parameter.
 *
 * - if you set the parameter types, it will check that precisely the
 * correct amount are set
 */
export function isFnWithParams<T, P extends readonly SimpleToken[]>(
  input: T,
  ...params: P
): input is T & AsNarrowingFn<
  P["length"] extends 0
    ? [any, ...any[]]
    : {
        [K in keyof P]: SimpleType<P[K]>
      },
  T extends TypedFunction ? ReturnType<T> : unknown
> {
  return params.length === 0
    ? typeof input === "function" && input?.length > 0
    : typeof input === "function" && input?.length === params.length;
}
