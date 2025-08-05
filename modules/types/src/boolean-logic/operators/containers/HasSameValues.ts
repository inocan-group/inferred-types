import type {
    And,
    Container,
    IsAny,
    IsNever,
    NarrowlyContains,
    Values
} from "inferred-types/types";

type CheckAllExist<
    A extends readonly unknown[],
    B extends readonly unknown[]
> = [] extends A
    ? true  // Empty array case - all elements exist (vacuously true)
    : And<{
        [K in keyof A]: NarrowlyContains<B, A[K]>
    }>;

type Test<
    A,
    B
> = A extends readonly unknown[]
? B extends readonly unknown[]
    ? [] extends A
        ? [] extends B
            ? true  // Both arrays are empty
            : false  // A is empty, B is not
        : [] extends B
            ? false  // B is empty, A is not
        : A["length"] extends B["length"]
            ? CheckAllExist<A, B> extends true
                ? CheckAllExist<B, A> extends true
                    ? true  // Bidirectional check passes
                    : false  // A elements exist in B, but B elements don't exist in A
                : false  // A elements don't all exist in B
            : false
    : false
: false;

/**
 * **HasSameValues**`<TContainer,TComparator>`
 *
 * Boolean type utility which determines if the values in
 * `TContainer` and `TComparator` are the same (even if the order
 * is different).
 *
 * - if _either_ `TContainer` or `TComparator` are wide types then
 * this utility will evaluate to `boolean` rather than the typical `true`
 * or `false` literals
 *
 * #### `any` and `never`
 *
 * - if _either_ `TContainer` or `TComparator` or _both_ are equal to
 * `never` or `any` then this utility will resolve in `TException` (which
 * defaults to being `false`)!
 */
export type HasSameValues<
    TContainer extends Container,
    TComparator extends Container,
    TException = false
> = [IsAny<TContainer>] extends [true]
    ? TException
: [IsNever<TContainer>] extends [true]
    ? TException
: [IsAny<TComparator>] extends [true]
    ? TException
: [IsNever<TComparator>] extends [true]
    ? TException
: Test<Values<TContainer>, Values<TComparator>> extends true
    ? true
    : TException;
