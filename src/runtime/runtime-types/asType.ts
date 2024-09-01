import {
  AsType,
  SimpleScalarToken,
  SimpleToken,
  SimpleType
} from "src/types/runtime-types";

/**
 * **asType**(token)**
 *
 * Converts a `SimpleToken` into it's corresponding _type_.
 */
export const asType = <
  T extends SimpleToken
>(token: T) => {

  return (
    token
  ) as unknown as SimpleType<T>
}

export const asStringLiteral = <
  T extends readonly SimpleScalarToken[]
>(...values: T) => {

  return values.map(i => i as unknown as AsType<typeof i>)
}

