import type { AnyObject, ExpandDictionary } from "inferred-types/types";

export type ErrMsg<
  TType extends string,
  TContext extends AnyObject | string = "no desc",
> = TContext extends string
  ? TType & { desc: TContext; kind: "ErrMsg" }
  : TType & ExpandDictionary< TContext & { kind: "ErrMsg" }>;
