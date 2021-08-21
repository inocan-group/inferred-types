import { Narrowable } from "~/types";

export type Condition<TInput extends Narrowable, TResult extends boolean> = (
  input: TInput
) => TResult;

export const condition = <TInput extends Narrowable, C extends Condition<Narrowable, boolean>>(
  c: C,
  input: TInput
) => {
  // const v
  return c(input);
};
