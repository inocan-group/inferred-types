import { Keys } from "src/types/Keys";
import { TupleFilter } from "src/types/lists";
import { UnionToTuple } from "src/types/type-conversion/UnionToTuple";
import { IfEquals, TupleToUnion } from "..";

/**
 * **keys**(obj, [excluding])
 * 
 * Provides a read-only array of the _keys_ an object contains.
 * 
 * Optionally, you can add property names after object to exclude
 * those properties from the returned Tuple.
 */
export function keys<
  TObj extends Record<string, any>,
  TExcluding extends readonly (keyof TObj & string)[] = readonly[]
>(obj: TObj, ...excluding: TExcluding) {
  return (
    Object
    .keys(obj)
    .filter(i => excluding.includes(i))
  ) as unknown as TExcluding extends [any, ...any[]] 
    ? Readonly<TupleFilter<UnionToTuple<Keys<TObj>>, TupleToUnion<TExcluding>>>
    : IfEquals<Keys<TObj>, [], readonly [], Readonly<UnionToTuple<Keys<TObj>>>>;
}

