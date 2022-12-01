import { Or } from "src/types/combinators/Or";

export function or<O extends readonly boolean[]>(...conditions: O) {
  return (conditions.some((v) => v === true) ? true : false) as Or<O>;
}
