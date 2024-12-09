
/** 
 * **HasProp**<TTest,TProp,[TIf],[TElse]>
 * 
 * Boolean operator which returns true or false (by default) based
 * on whether `TTest` has a property defined by `TProp`.
 * 
 * If you wish to change the true/false values you can override
 * the `Tif` and `TElse` generics.
 */
export type HasProp<
  TTest,
  TProp extends string,
  TIf = true,
  TElse = false
> = TTest extends object
? TProp extends keyof TTest
  ? TIf
  : TElse
: TElse;
