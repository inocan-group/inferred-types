import { isRegExp, isString } from "src/runtime/index";
import { AsType, SimpleToken } from "src/types/index";

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
  TRep extends readonly SimpleToken[]
>(re: TExp, ...rep: TRep ) => {
  let exp: string="";

  if (isString(re)) {
    // regex's coming in as a string must be validated
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
    // all representations must be stored as as a string
    exp = re.toString();
  }

  // exp has been validated as valid
  const token = `<<string-set::regexp::${encodeURIComponent(exp)}>>`

  return token as AsType<TRep>
}
