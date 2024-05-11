
import { 
  KV,
  IsEqual,
  If,
  IsWideType,
  DoesExtend,
  ObjectKey,
  IfNever,
  UnionToTuple,
  RemoveIndexKeys,
  Or,
  IsNonLiteralUnion,
  ExplicitlyEmptyObject,
} from "src/types/index";


type _Keys<
  T extends KV
> = UnionToTuple<keyof RemoveIndexKeys<T>>;

type CheckIt<T extends KV> = IfNever<
  keyof T,
  false,
  "length" extends keyof _Keys<T>
  ? If<
      IsEqual<_Keys<T>["length"], 0>,
      If<
        Or<[
          IsWideType<DoesExtend<keyof T, ObjectKey>>,
          IsNonLiteralUnion<keyof T>,
          IsWideType<keyof T>
        ]>,
        If<IsEqual<T, ExplicitlyEmptyObject>, true, false>,
        IfNever<keyof T, false, true>
      >,
      If<
        IsEqual<_Keys<T>["length"], number>,
        false,
        true
      >
    >
  : false
>

/**
 * **IsObjectLiteral**`<T>`
 * 
 * Tests whether an object is a literal. An object literal is any of the following:
 * 
 * - any KV-like type which has an **explicit** number of keys
 * - if `Keys<T>["length"]` translates to `number` than this is **not** a literal.
 */
export type IsObjectLiteral<T> = T extends KV
? CheckIt<T>
: false

