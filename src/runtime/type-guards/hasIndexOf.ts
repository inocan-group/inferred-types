import { IfLength,  Keys,  Key, Container, Scalar, TupleToUnion, Tuple, IfContains } from "src/types";
import { keysOf } from "src/runtime";

// type KeyType<T> = T extends readonly number[]
//   ?  number
//   :  T extends AnyObject
//     ? (string | symbol)
//     : Key;

// type ToKeys<T> = Keys<Exclude<T, Scalar | undefined>> & Tuple;


type ReturnType<TKeys extends readonly Key[]> = 
  IfLength<TKeys, 0, never, TupleToUnion<TKeys>>;


/**
 * **HasIndexOf**`<TValue>`
 * 
 * A partial applied type-guard to validate whether a future _index_ value is
 * valid or not.
 */
export type HasIndexOfValidationFn<TKeys extends readonly Key[]> = <
  TIndex extends Key
>(idx: TIndex) => idx is TIndex & ReturnType<TKeys>;


// : value is TIndex extends number 
//   ? TValue & Tuple<unknown, Length<TValue & readonly unknown[]>>
//   : TValue & Record<TIndex, unknown> =>

/**
 * Validate
 */
const validate = <TValue extends Container>(value: TValue): HasIndexOfValidationFn<Keys<TValue>> => 
  <TIndex extends Key>(idx: TIndex): idx is TIndex & ReturnType<Keys<TValue>> => {
  const keys = keysOf(value);

  return keys.includes(idx );
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
export const hasIndexOf = <TValue extends Container>(value: TValue): HasIndexOfValidationFn<Keys<TValue>> => validate(value);

