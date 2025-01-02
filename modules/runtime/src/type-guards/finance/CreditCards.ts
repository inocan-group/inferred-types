import type { AmericanExpress, CreditCard, VisaMastercard } from "inferred-types/types";
import { isNumberLike, isString } from "inferred-types/runtime";

export function isVisaMastercard(val: unknown): val is VisaMastercard {
  if (isString(val)) {
    const parts = val.split(" ");
    return parts.length === 4 && parts.every(i => isNumberLike(i) && i.length === 4);
  }
  return false;
}

export function isAmericanExpress(val: unknown): val is AmericanExpress {
  if (isString(val)) {
    const parts = val.split(" ");
    return parts.length === 3
      && parts.every(i => isNumberLike(i)
        && parts[0].length === 4
        && parts[1].length === 6,
      );
  }
  return false;
}

export function isCreditCard(val: unknown): val is CreditCard {
  return isVisaMastercard(val) || isAmericanExpress(val);
}
