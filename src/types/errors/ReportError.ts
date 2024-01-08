import { ErrorCondition, TypeErrorInfo } from "..";

/**
 * **ReportError**
 * 
 * Type utility which takes a _desired state_ of `T` and then inspects the 
 */
export type ReportError<T> = T extends ErrorCondition<infer Kind, infer Msg>
  ? ErrorCondition<Kind, Msg>
  : Exclude<T, ErrorCondition<string, string>>;

export function errorCondition<
  TKind extends string, 
  TDesc extends string,
  TInfo extends TypeErrorInfo | null,
>(
  kind: TKind, 
  message: TDesc = "" as TDesc, 
  info: TInfo = null as TInfo,
) {
  return {
    _type: "ErrorCondition",
    kind,
    message,
    context: info?.context || {},
    utility: info?.utility,
    stack: info?.stack || [],
    id: info?.id || kind,
    library: info?.library,
  } as ErrorCondition<TKind, TDesc, TInfo>;
} 
