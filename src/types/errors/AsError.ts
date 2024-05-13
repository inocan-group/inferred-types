import { 
  AnyObject, 
  AsIndexOf, 
  Concat, 
  IfNever, 
  IsEqual, 
  ToString,
  ErrorCondition, 
  EmptyObject,
  TypeErrorInfo,
  Throw,
} from "src/types/index";

interface Error<
  TName extends string = string, 
  TMsg extends string = string
> {
  name: TName;
  message: TMsg;
  stack?: string;
}


export type AsError__Meta = [
  kind: string,
  msg: string,
  context: TypeErrorInfo
] | [
  kind: string,
  msg: string
];

type Props<T extends AnyObject | undefined> = T extends AnyObject
? T
: EmptyObject;

type IdFrom<T extends AnyObject> = AsIndexOf<T,"id",never>;
type LibraryFrom<T extends AnyObject> = AsIndexOf<T,"library",never>;

type Process<
  T extends AsError__Meta
> = IsEqual<T, [string, string]> extends true
? ErrorCondition<T[0], T[1], never >
: T extends [string, string, TypeErrorInfo]
  ? Throw<
    T[0], 
    T[1],
    "AsError",
    {
      id: IdFrom<Props<T[2]>>; 
      library: LibraryFrom<Props<T[2]>>;
    }
  >
  : ErrorCondition<
      T[0], 
      T[1],
      never
    >;

/**
 * **AsError**`<T>`
 * 
 * Proxies through all `T`'s which are already extended from `ErrorCondition`
 * unchanged but converts all other types into 
 * 
 * If no known formula's are found to convert to an ErrorCondition then a
 * `ErrorCondition<"failed-to-wrap">` error will be produced:
 * 
 * #### Known Formulas:
 * - `never` - converted to `ErrorCondition<"never-value">`
 * - `Error` - a JS `Error` type is converted to `ErrorCondition<"runtime-error"> and it's properties are available in the error conditions hash storage as `error`
 * - `ErrorCondition` - any pre-existing `ErrorCondition` will just be proxied through
 * - `[kind, msg, [context]]` - it will:
 *    - the first two parameters will map directly into the error condition properties of the same name
 *    - the optional `context` object is a dictionary of key value pairs; where:
 *      - when the keys match one of the root properties of `ErrorCondition` it will be
 *        mapped onto that property (assuming that the _type_ is appropriate)
 *      - otherwise it will be added to the `context` dictionary appearing as a prop on 
 *        `ErrorCondition`.
 * 
 * **Related:** `Throw`
 */
export type AsError<
  TType,
> = TType extends ErrorCondition ? TType : IfNever<
  TType,
  ErrorCondition<
    "never-value", 
    "a 'never' type was encountered which is not allowed in this context!" 
  >,
  TType extends Error<string>
  ? Throw<
      "runtime-error", 
      `the JS runtime's Error class was found with the message: '${TType["message"]}'`,
      "AsError",
      { library: "inferred-types" }
    >
  : TType extends AsError__Meta
      ? Process<TType>
      : Throw<
          "failed-to-wrap",
          Concat<[
            "An unexpected value -- ",
            ToString<TType>,
            " -- was passed into the AsError<T> type utility!"
          ]>,
          "AsError",
          { library: "inferred-types" }
        >
>;
