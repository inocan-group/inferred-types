import { IsLiteral, IsUnion, Throw } from "src/types/index";


/**
 * **IdentityFn**`<TValue, [TNarrow]>`
 *
 * A function which returns the value of `T`.
 */
export type IdentityFn<
  TValue,
  TNarrow extends boolean = false
> = [TNarrow] extends [true]
? [IsLiteral<TValue>] extends [true]
  ? [IsUnion<TValue>] extends [true]
    ? <T extends TValue>(v: T) => T
    : Throw<"invalid-literal", `A narrowing identity function must be based off a wide type or a union of literals!`, "IdentityFn", { value: TValue }>
  : <T extends TValue>(v: T) => T
: () => TValue;


