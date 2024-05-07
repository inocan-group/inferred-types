
import { 
  Keys,
  KV,
  IsEqual,
  If,
  IsWideType,
  DoesExtend,
  ObjectKey,
  IfNever,
} from "src/types/index";

type CheckIt<T extends KV> = If<
    IsEqual<Keys<T>["length"], 0>,
    If<
      IsWideType<DoesExtend<keyof T, ObjectKey>>,
      false,
      IfNever<keyof T, false, true>
    >,
    If<
      IsEqual<Keys<T>["length"], number>,
      false,
      true
    >
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
