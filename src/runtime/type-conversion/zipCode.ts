import { asString, isUndefined, createErrorCondition } from "src/runtime/index";
import { AsString, AsZipCode } from "src/types/index";

/**
 * **asZipCode**`(code)`
 * 
 * Validates the code as a zip code or returns `ErrorCondition<"invalid-zip">`
 */
export const asZipCode = <T extends string | number>(code: T) => {
  const [zip, plus4] = asString(code).split("-").map(i => i.trim());
  
  const validZip = zip.length === 5 && typeof Number(zip) === "number" ? true : false;
  const validPlus4 = isUndefined(plus4)
    ? true
    : plus4.length === 4 && typeof Number(plus4) === "number" ? true : false;

  return validZip && validPlus4
    ? code as unknown as AsZipCode<AsString<T>>
    : createErrorCondition("invalid-zip") as unknown as AsZipCode<AsString<T>>
}
