import { Every, IsUnion, UnionToTuple } from "inferred-types/types";

/**
 * **AllUnionMembersExtend**`<T>`
 *
 * Boolean operator which tests whether `T`'s union members ALL extends type `U`.
 *
 * - if `T` is _not_ a union then this will always return `false`
 */
export type AllUnionMembersExtend<T, U> = IsUnion<T> extends true
? Every<UnionToTuple<T>, "extends", U>
: false;
