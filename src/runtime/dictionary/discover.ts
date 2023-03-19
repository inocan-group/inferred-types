import { CommonObjProps, COMMON_OBJ_PROPS } from "src/constants";
import { isContainer } from "../type-guards/isContainer";



/**
 * **discover**(value, [...lookFor])
 * 
 * A runtime utility which tries to narrow the `value`
 * passed in.
 * 
 * - if you are passing in an object you can express which
 * properties you are interested in exploring.
 */
export function discover<
  TValue, 
  TLookFor extends readonly PropertyKey[] = CommonObjProps
>(val: TValue, ...lookFor: TLookFor ) {
  lookFor = lookFor ? lookFor as TLookFor : COMMON_OBJ_PROPS as unknown as TLookFor;

  

  if (isContainer(val)) {
    for (const prop in lookFor) {
      if (prop in val) {
        
      }
    }

  }

  
  return val as TValue & Discovered;
}

