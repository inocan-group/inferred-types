import { ErrorCondition } from "./ErrorCondition";

/**
 * **ReportError**
 * 
 * Type utility which takes a _desired state_ of `T` and then inspects the 
 */
export type ReportError<T> = T extends ErrorCondition<infer Kind, infer Msg>
  ? ErrorCondition<Kind, Msg>
  : Exclude<T, ErrorCondition<string, string>>;

export function errorCondition<K extends string, T extends string>(kind: K, message: T = "" as T) {
  return {
    _type: "ErrorCondition",
    kind,
    message
  } as ErrorCondition<K, T>;
} 
