import { keysOf } from "src/runtime";
import {  Keys,  Key, Container } from "src/types";

// type KeyType<T> = T extends readonly number[]
//   ?  number
//   :  T extends AnyObject
//     ? (string | symbol)
//     : Key;

// type ToKeys<T> = Keys<Exclude<T, Scalar | undefined>> & Tuple;




/**
 * **HasIndexOf**`<TValue>`
 * 
 * A partial applied type-guard to validate whether a future _index_ value is
 * valid or not.
 */
export type HasIndexOfValidationFn<TValue, TKeys extends readonly PropertyKey[]> = <
  TIndex extends PropertyKey
>(idx: TIndex) => idx is TIndex & keyof TValue;


// : value is TIndex extends number 
//   ? TValue & Tuple<unknown, Length<TValue & readonly unknown[]>>
//   : TValue & Record<TIndex, unknown> =>

/**
 * Validates that 
 */
const validate = <
  TValue, 
  TKeys extends readonly PropertyKey[]
>(value: TValue, keys: TKeys): HasIndexOfValidationFn<TValue,TKeys> => <
  TIndex extends PropertyKey
>(idx: TIndex): value is TValue & Record<typeof idx, unknown> => {
  return keys.includes(idx);
};



/**
 * **hasIndexOf**(value) => (idx) => boolean
 * 
 * A higher-order type guard which determines:
 * 
 * 1. what the valid indexes of `value` are (array or string)
 * 2. whether `idx` is within the valid set of indexes for `value`
 * 
 * A conditional statement like the following example should
 * provide the type system with all the information needed:
 * ```ts
 * if ( hasIndexOf(myObj)("name") ) {
 *    const greeting = `Hello ${myObj.name}`;
 * }
 * ```
 */
export const hasIndexOf = <
  TValue
>(value: TValue): HasIndexOfValidationFn<
  TValue extends Container ? Keys<TValue>: readonly PropertyKey[]
> => validate(value, keysOf(value));
