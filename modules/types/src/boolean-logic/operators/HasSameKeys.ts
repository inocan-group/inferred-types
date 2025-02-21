import type { And, AsTuple, Container, DoesExtend, HasSameValues, IsTuple, ObjectKey, RemoveIndexKeys, UnionToTuple } from "inferred-types/types";

type Process<
  A extends readonly unknown[],
  B extends readonly unknown[],
> = And<{
  [K in keyof A]: K extends keyof B
    ? true
    : false
}>;

type _Keys<T extends object> = UnionToTuple<keyof RemoveIndexKeys<T>> extends readonly ObjectKey[]
  ? UnionToTuple<keyof RemoveIndexKeys<T>>
  : never;

/**
 * **HasSameKeys**`<A,B>`
 *
 * Boolean operator which compares two lists to see if they have the same keys.
 */
export type HasSameKeys<
  A extends Container,
  B extends Container,
> =
IsTuple<A> extends true
  ? IsTuple<B> extends true
    ? AsTuple<A>["length"] extends AsTuple<B>["length"]
      ? Process<AsTuple<A>, AsTuple<B>>
      : false
    : false
  : DoesExtend<A, object> extends true
    ? DoesExtend<B, object> extends true
      ? _Keys<A>["length"] extends _Keys<B>["length"]
        ? HasSameValues<_Keys<A>, _Keys<B>>
        : false
      : false
    : false;
