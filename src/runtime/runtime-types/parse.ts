
import { Shape } from "src/types/index";
import { isShape } from "./shape";
import { getTokenName } from "./shape-helpers/getTokenName";
import { getTokenData } from "./shape-helpers/getTokenData";

export type ParsedToken<
  TType
> = {
  isToken: true;
  type: TType;
  token: Shape;
  tokenName: string;
  tokenData: readonly string[];
};

const handleTypeToken = <TToken extends Shape>(token: TToken) => <TType>() => {
  return {
    isToken: true,
    type: null as unknown as TType,
    token,
    tokenName: getTokenName(token),
    tokenData: getTokenData(token),
  }
}


/**
 * **parse**`(value)`
 * 
 * Detects if the value passed in is a type token
 * from the `ShapeApi`. 
 */
export const parse = <T>(value: T) => {
  return isShape(value) 
    ? handleTypeToken(value)<T>()
    : {
      isToken: false,
      type: value,
    }
}

// export const IsParsedToken = <T>(value: T): value is ParsedToken<T> => {
//   return isObject(value) && "isToken" in value && value.isToken === true;
// }
