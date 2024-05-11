import type { 
  GetEach, 
  IfNull,
  Container,
  ErrorCondition,
  RemoveNever,
  Contains,
  If,
  Or,
  RemoveMarked,
  NarrowlyContains,
} from "src/types/index";
import { MARKED } from "../../constants/Marked";

type Marked = typeof MARKED

type _NoDeref<
  A extends readonly unknown[],
  B extends readonly unknown[],
> = RemoveNever<{
  [K in keyof A]: If<
    Contains<B, A[K]>,
    A[K],
    never
  >
}>;

type DerefNoReport<
  AValues extends readonly unknown[],
  BValues extends readonly unknown[],
> = RemoveNever<{
  [K in keyof AValues]: If<
    Contains<BValues, AValues[K]>,
    AValues[K],
    never
  >
}>;

type DerefWithReport<
  A extends readonly Container[],
  B extends readonly Container[],
  TKeys extends readonly PropertyKey[],
  TDeref
> = [
  // left
  RemoveMarked<{
    [K in keyof A]: TDeref extends keyof A[K]
    ? If<
        NarrowlyContains<TKeys, A[K][TDeref]>,
        A[K],
        Marked
      >
    : never
  }>,
  // right
  RemoveMarked<{
    [K in keyof B]: TDeref extends keyof B[K]
    ? If<
        NarrowlyContains<TKeys, B[K][TDeref]>,
        B[K],
        Marked
      >
    : Marked
  }>
];


type _WithDeref<
  A extends readonly Container[],
  B extends readonly Container[],
  AValues extends readonly unknown[],
  BValues extends readonly unknown[],
  TDeref extends PropertyKey,
  TReport extends boolean
> = TReport extends false
? DerefNoReport<AValues,BValues>
: DerefNoReport<AValues,BValues> extends readonly PropertyKey[] 
  ? DerefWithReport<A,B,DerefNoReport<AValues,BValues>, TDeref>
  : never;


type HandleDeref<
  A extends readonly unknown[],
  B extends readonly unknown[],
  TDeref extends PropertyKey,
  TReport extends boolean = false
> = 
A extends readonly Container[]
? B extends readonly Container[]
  ? GetEach<A, TDeref> extends readonly unknown[]
    ? GetEach<B, TDeref> extends readonly unknown[]
      ? _WithDeref<
          A, 
          B,
          GetEach<A, TDeref>,
          GetEach<B, TDeref>,
          TDeref,
          TReport
        >
      : never
    : never
  : ErrorCondition<
      "invalid-container-tuple", 
      "In Intersection<A,B> the B set was not Container[] tuple!",
      { context: {a: A; b: B} }
    >
: ErrorCondition<
    "invalid-container-tuple", 
    "In Intersection<A,B> the A set was not Container[] tuple!",
    { context: {a: A; b: B} }
  >;

/**
  * **Intersection**`<A,B, [TDeref]>`
  * 
  * Takes two tuple sets `A` and `B` and returns each of their _value intersections_.
  *
  * - this behavior is modified when the `deref` property is provided
  *   - the expectation now is that both A and B contain _containers_ and their
  * "value" is based on the offset provided by `TDref`
  *   - in this mode, all _scalar_ values in `A` or `B` will be ignored
  *   - the `TReport` property is by default set to _false_ but if changed to 
  * _true_ then this changes the reporting structure to:
  * ```ts
  * [A: values[], B: values[]]
  * ```
  * where the left side contains all containers -- in their entirety -- which 
  * intersect based on the `TDeref` property values.
  * 
  * **Related:** `Unique`, `IntersectingKeys`
  */
export type Intersection<
  A extends readonly unknown[],
  B extends readonly unknown[],
  TDeref extends PropertyKey | null = null,
  TReport extends boolean = false
> = IfNull<
  TDeref, 
  // no dereferencing
  _NoDeref<A,B>,
  // dereference the array elements
  TDeref extends PropertyKey
    ? HandleDeref<A,B,TDeref,TReport>
    : ErrorCondition<
        "invalid-deref",
        "The TDeref property was set but must be extended from a PropertyKey!",
        { context: {deref: TDeref } }
      >
>;
