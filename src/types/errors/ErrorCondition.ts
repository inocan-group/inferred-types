/* eslint-disable @typescript-eslint/ban-types */
/**
 * **ErrorCondition**`<T>`
 * 
 * A way to express a meaningful error message in type system
 */
export interface ErrorCondition<
  TKind extends string, 
  TMsg extends string = string, 
  TDomain extends string = string,
  TVars extends Record<string, unknown> = {}
> {
  _type: "ErrorCondition";
  domain: TDomain;
  kind: TKind;
  message: TMsg;
  variables: TVars;
}
