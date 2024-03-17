import { 
  EmptyObject,  
  IfEqual,   
  IfObjectLiteral,  
  IndexableObject,  
  Keys 
} from "src/types/index";

/**
 * **HasIndex**`<TTest, TElse>`
 * 
 * A type utility which determines whether `T` -- which is guaranteed to
 * have the _possibility_ of being indexed -- actually has at least one
 * indexed property.
 * 
 * - if `T` _does_ have at least one property then `T` is proxied through
 * - if `T` _does not_ then `TElse` is return (which is **never** by default)
 */
export type HasIndex<
  TTest extends IndexableObject,
  TElse = never
> = IfEqual<
  TTest, EmptyObject,
  TElse,
  IfObjectLiteral<
    TTest,
    Keys<TTest>["length"] extends 0
      ? TElse
      : TTest,
    TElse
  >
>
