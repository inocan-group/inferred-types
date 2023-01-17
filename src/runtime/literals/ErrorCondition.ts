/**
 * **ErrorCondition**`<T>`
 * 
 * A way to express a meaningful error message in type system
 */
export interface ErrorCondition<TKind extends string, TMsg extends string, TDomain extends string = "global"> {
  _type: "ErrorCondition";
  domain: TDomain;
  kind: TKind;
  message: TMsg;
}

/**
 * **ReportError**
 * 
 * Type utility which takes a _desired state_ of `T` and then inspects the 
 */
export type ReportError<T> = T extends ErrorCondition<infer Kind, infer Msg>
  ? ErrorCondition<Kind, Msg>
  : Exclude<T, ErrorCondition<any, any>>;

export function errorCondition<K extends string, T extends string>(kind: K, message: T = "" as T) {
  return {
    _type: "ErrorCondition",
    kind,
    message
  } as ErrorCondition<K, T>;
} 

