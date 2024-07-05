import {
  AsType,
  SimpleScalarToken,
  SimpleToken,
  SimpleType
} from "src/types/runtime-types";


export const asType = <
  T extends SimpleToken
>(val: T) => {

  return (
    val
  ) as SimpleType<T>
}

export const asStringLiteral = <
  T extends readonly SimpleScalarToken[]
>(...values: T) => {

  return values.map(i => i as unknown as AsType<typeof i>)
}
