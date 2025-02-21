import type { BRANDED } from "inferred-types/constants";
import type {
  Dictionary,
  EmptyObject,
  ExpandDictionary,
  If,
  IsEqual,
  Scalar,
} from "inferred-types/types";

export type Branded = typeof BRANDED;

/**
 * Brands a `Scalar` value as a **Branded Value**
 */
export type Brand<
  TVal extends Scalar,
  TBrand extends string,
  TKv extends Dictionary = EmptyObject,
> = TVal & If<
  IsEqual<TKv, EmptyObject>,
  { Branded: TBrand },
  ExpandDictionary<{ Branded: TBrand } & TKv>
>;
