/* eslint-disable @typescript-eslint/no-empty-object-type */
type AnyObject = Record<never,unknown> | Record<string|symbol, unknown>;

type AnyFunction<
  TArgs extends readonly unknown[] = unknown[],
  TReturn = unknown,
  TProps extends AnyObject = AnyObject,
> = TProps extends Record<never,unknown>
  ? (...args: TArgs) => TReturn
  : ((...args: TArgs) => TReturn) & TProps;

/**
 * **wide**
 *
 * Provides a dictionary of _wide_ types; in most cases you should
 * prefer the **kind** API.
 */
export const WideAssignment = {
  boolean: () =>  "<<boolean>>" as unknown as boolean,
  string: () =>  "<<string>>" as string,
  number: () => "<<number>>" as unknown as number,
  symbol:() =>  "<<symbol>>" as unknown as symbol,
  null: () => "<<null>>" as unknown as null,
  function:() =>  "<<function>>" as unknown as AnyFunction,
  tuple:() => "<<tuple>>" as unknown as readonly unknown[],
  singularTuple: () => ["<<tuple>>"] as unknown as [readonly unknown[]],
  object: () =>  "<<object>>" as AnyObject,
  emptyObject:() => "<<empty-object>>" as Record<never,unknown>,
  undefined: () => "<<undefined>>" as unknown as undefined,
  /**
   * run-time value is a type token for `unknown` and type is of course `unknown`
   */
  unknown: () =>  "<<unknown>>" as unknown,
  nothing: (): null | undefined => "<<nothing>>" as unknown  as (null | undefined),
  something: () => "<<something>>" as unknown as {}
} as const;
