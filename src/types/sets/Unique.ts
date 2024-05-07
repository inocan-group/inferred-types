import { 
  AfterFirst, 
  First,
  IfNever,
  Contains,
  Push,
  Container,
  Not,
  GetEach,
  IsScalar,
  If,
  TupleToUnion,
  UnionToTuple,
} from "src/types/index";

type Get<
  TValue,
  TDeref extends PropertyKey | never,
> = IfNever<
  TDeref, 
  TValue, // just proxy value back
  TDeref extends keyof TValue
    ? TValue[TDeref]
    : TValue extends Container
      ? never
      : TValue
>

type Process<
  TValues extends readonly unknown[],
  TDeref extends string |number | never,
  TResults extends readonly unknown[] = []
> = [] extends TValues
? TResults
: Process<
    AfterFirst<TValues>,
    TDeref,
    // push new value into TResults if unique
    Push<
      TResults,
      First<TResults>,
      If<
        IsScalar<First<TValues>>,
        // a scalar value should/can ignore the deref setting
        Not<Contains<TResults, First<TValues>>>,
        // a non-scalar must consider deref setting
        Not<Contains<
          IfNever<
            TDeref, 
            TResults, 
            GetEach<TResults, TDeref>
          >,
          Get<First<TValues>,TDeref>
        >> 
      >
    >
>;

/**
 * **Unique**`<TList, [TDeref]>`
 * 
 * Given a tuple of values, this utility will reduce the tuple to
 * _unique_ values in the set.
 * 
 * - If the values are containers themselves, you can provide a `TDeref`
 * to point to a property which represents the "identity" of that container
 * - If you're comparing containers _without_ a `TDeref` property
 * then the full type signature will be used in deduplication
 * 
 * ```ts
 * // ["foo", "bar"]
 * type FooBar = Unique<["foo","foo","bar"]>;
 * ```
 */
export type Unique<
  TList extends readonly unknown[],
  TDeref extends string | number | never = never
> = IfNever<
  TDeref,
  UnionToTuple<TupleToUnion<TList>>,

  Process<
    TList,
    TDeref
  >
> 
