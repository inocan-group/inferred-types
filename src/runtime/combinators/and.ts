import type { And } from "src/types/index";

/**
 * Groups a number of "logic functions" together by combining their results using
 * the logical **AND** operator
 */
export const and = <
  TList extends readonly boolean[],
>(...values: TList): And<TList> => {
  return values.every(i => i === true) as And<TList>;
};
