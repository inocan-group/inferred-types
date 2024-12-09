import type { EmptyObject, ExpandRecursively } from "inferred-types/types";

/**
 * Given a dictionary of type `<T>`, this utility function will
 * make the `<R>` generic property _required_ (use a union to make
 * more than one prop required).
 *
 * ```ts
 * // { foo: string, bar?: number }
 * type Example = RequireProps<{foo?: string, bar?: number}, "foo">;
 * ```
 */
export type RequireProps<
  T extends EmptyObject,
  R extends keyof T,
> = ExpandRecursively<
  Required<Pick<T, R>> & T
>;
