import {
  ErrorCondition,
  TypeErrorInfo,
  IfNever,
  EmptyObject
} from "inferred-types/dist/types/index";

type Stack<
  TRest extends TypeErrorInfo
> = "underlying" extends keyof TRest
? TRest["underlying"] extends ErrorCondition
  ? "stack" extends keyof TRest["underlying"]
    ? TRest["underlying"]["stack"] extends readonly string[]
      ? TRest["underlying"]["stack"]
      : never
    : never
  : never
: never;


type HandleStack<
  TUtility extends string,
  TRest extends TypeErrorInfo
> = IfNever<
  TUtility,
  IfNever<Stack<TRest>, never, ["unspecified", ...Stack<TRest>]>,
  IfNever<Stack<TRest>, [TUtility], [TUtility, ...Stack<TRest>]>
>


/**
 * **Throw**`<TKind,[TMessage],[TUtility],[TRest]>`
 *
 * Allows a user to conveniently create a well formed `ErrorCondition`
 * which prioritizes:
 *
 * - `TKind` - is **required** and gives the error a dasherized name
 * which a caller can respond to. It provides a critical "grouping" feature.
 * - `TMessage` - provides a user friendly message about the error
 * - `TUtility` - the name of the _type utility_ in which this condition
 * is being raised.
 *
 * The final parameter is `TRest` which provides a key/value dictionary --
 * defined by `TypeErrorInfo` -- which can further describe the error.
 */
export type Throw<
  TKind extends string,
  TMessage extends string = never,
  TUtility extends string = never,
  TRest extends TypeErrorInfo = EmptyObject,
  TStack extends readonly string[] = HandleStack<TUtility,TRest>,
> = ErrorCondition<
  TKind,
  TMessage,
  TUtility,
  TStack,
  TRest
>;
