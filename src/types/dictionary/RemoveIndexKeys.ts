import { AnyObject, TupleToUnion, IfNever, ExplicitKeys } from "src/types";


/**
 * **RemoveIndexKeys**`<T>`
 * 
 * Removes _index_ keys which permit key/values to be added to an object while
 * retaining all explicit key/values defined on an object.
 * 
 * ```ts
 * type Obj = { [key: string]: unknown; foo: 42 };
 * // { foo: 42 }
 * type Obj2 = RemoveIndexKeys<Obj>;
 * ```
 */
export type RemoveIndexKeys<T extends AnyObject> = IfNever<
  Pick<T, TupleToUnion<ExplicitKeys<T>>>,
  never,
  Pick<T, TupleToUnion<ExplicitKeys<T>>>
>;
