import { FnToken, GeneratorToken } from "src/types/index"
import { isString } from "src/runtime/index"


export const isFnToken = (val: unknown): val is FnToken => {
  return isString(val) && val.startsWith("<<fn::")
}

export const isGeneratorToken = (val: unknown): val is GeneratorToken => {
  return isString(val) && val.startsWith("<<gen::")
}
