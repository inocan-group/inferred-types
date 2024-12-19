import type { AnyObject } from "inferred-types/types";

export type ErrMsg<
  TType extends string,
  TContext extends AnyObject | string = "no desc",
> = TContext extends string
  ? TType & { desc: TContext }
  : TType & TContext;
