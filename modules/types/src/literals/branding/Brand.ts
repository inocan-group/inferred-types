import { BrandSymbol, Scalar } from "inferred-types/types"

export type Brand<
    Base extends Scalar,
    Kind
> = Base & { [BrandSymbol]: Kind };
