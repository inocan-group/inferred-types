import { ErrorCondition } from "..";

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
  TDomain extends string,
  TVars extends Record<string, unknown>
>(
  kind: TKind, 
  message: TDesc = "" as TDesc, 
  domain: TDomain = "" as TDomain,
  variables: TVars = {} as TVars
) {
  return {
    _type: "ErrorCondition",
    kind,
    message,
    domain,
    variables
  } as ErrorCondition<TKind, TDesc, TDomain, TVars>;
} 
