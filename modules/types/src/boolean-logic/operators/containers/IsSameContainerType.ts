import type { Container } from "types/base-types";
import type { And, IsArray, IsDictionary, Or } from "types/boolean-logic";

/**
 * test that `A` and `B` are both a Dictionary object or both are an array
 */
export type IsSameContainerType<A extends Container, B extends Container> = Or<[
    And<[ IsDictionary<A>, IsDictionary<B> ]>,
    And<[ IsArray<A>, IsArray<B> ]>,
]>;
