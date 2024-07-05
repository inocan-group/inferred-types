import {  asType, isString } from "src/runtime/index";
import { SimpleToken } from "src/types/index";
import { isRegExp } from "util/types";


/**
 * **regexToken**`(re, ...rep)`
 *
 * Creates a `TypeToken` that is a form of string literal and
 * represented in the type system via the use of the `SimpleToken`
 * elements defined in "rep" but then with the RegExp encoded into
 * the token too so that it can be used for validation during
 * runtime.
 */
export const regexToken = <
  TExp extends RegExp | string,
  TRep extends readonly string[]
>(re: TExp, ...rep: TRep & readonly SimpleToken[]) => {
  let exp: string="";

  if (isString(re)) {
    // test string for being a valid RegEx first
    try {
      const test = new RegExp(re);
      if (!isRegExp(test)) {
       const err = Error(`Invalid RegEx passed into regexToken(${re}, ${JSON.stringify(rep)})!`)
       err.name ="InvalidRegEx";
       throw err;
      } else {
        exp = re as string;
      }
    } catch(e) {
      const err = Error(`Invalid RegEx passed into regexToken(${re}, ${JSON.stringify(rep)})!`)
       err.name ="InvalidRegEx";
       throw err;
    }
  } else if (isRegExp(re)) {
    exp = re.toString();
  }

  // exp has been validated as valid
  const token = `<<string-set::regexp::${encodeURIComponent(exp)}>>`
  const type = asType(rep);
}
