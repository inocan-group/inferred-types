// import { isStringLiteral } from "typescript"
import { AlphaChar, Narrowable } from "src/types";
import { isString} from "src/runtime";

export const isAlpha<T extends Narrowable>(value: T): value is T & AlphaChar {
  return isString(value) & 
}
