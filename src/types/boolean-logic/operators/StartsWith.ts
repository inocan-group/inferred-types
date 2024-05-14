import { 
  AsString,  
  IsFalse, 
  IsEqual, 
  IsUnion, 
  Or 
} from "src/types/index";

type TestThatExtends<
  TValue extends string,
  TComparator extends string
> = [TValue] extends [`${TComparator}${string}`] ? true : false

type Process<
  TValue extends string,
  TComparator extends string
> = [IsFalse<TestThatExtends<TValue,TComparator>>] extends [true]
? false
: true;

type ProcessEach<
    TValue extends string,
    TComparator extends readonly string[]
> = {
  [K in keyof TComparator]: Process<TValue,TComparator[K]>
};



type PreProcess<
  TValue extends string,
  TComparator extends string | readonly string[]
> = TComparator extends readonly string[]
  ? ProcessEach<TValue, TComparator> extends readonly boolean[]
    ? Or<ProcessEach<TValue, TComparator>>
    : never
  : TComparator extends string
    ? Process<TValue,AsString<TComparator>>
    : never;

type IsWide<
  TValue extends string | number,
  TComparator extends string | number | readonly string[]
> = [IsEqual<AsString<TValue>,string>] extends [true]
? true
: [IsEqual<AsString<TComparator>,string>] extends [true]
? true
: false;

/**
 * **StartsWith**<TValue, TComparator>
 *
 * A type utility which checks whether `TValue` _starts with_ the 
 * value of `TComparator`.
 *
 * - numeric values for `TValue` will be converted into string literals
 * prior to comparison
 * - a tuple value in `TComparator` is allowed and will test whether
 * _any_ of the patterns start `TValue`
 * - a union type for `TComparator` is allowed so long as it's only for a single character
 *    - this can be much more type efficient for unions with lots of characters
 *    - if you need larger pattern matches then use a Tuple for `TComparator`
 */
export type StartsWith<
  TValue extends string | number,
  TComparator extends string | number | readonly string[]
> = [IsWide<TValue,TComparator>] extends [true]
? boolean
: [IsUnion<TComparator>] extends [true]
  ? IsFalse<
      PreProcess<
        `${TValue}`,
        TComparator extends number
          ? AsString<TComparator>
          : TComparator
      >
    > extends true
    ? false
    : true
  : PreProcess<
      AsString<TValue>,
      TComparator extends number
        ? `${TComparator}`
        : TComparator
    >;


