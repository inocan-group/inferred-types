import { AnyObject, UnknownObject } from "../boolean-logic";
import { ExpandRecursively } from "../ExpandRecursively";
import { AfterFirst, First } from "../lists";
import { KV } from "./ToKV";

type ConvertToObj<
  TKV extends readonly KV[],
  TResult extends UnknownObject = {}
> = [] extends TKV
  ? TResult
  : ConvertToObj<
      AfterFirst<TKV>,
      First<TKV> extends ["KV", infer Key, infer Value]
        ? Record<Key & string, Value> & TResult
        : never
    >;

/**
 * **FromKV**`<TKv>`
 * 
 * Converts a readonly array of KV values back into an object.
 * 
 * - without any additional help, the object will be constructed
 * but it will leave a "safety value" for new properties to be added
 * - if you like, you can add `TTarget` as your target shape for the
 * object and it will be incorporated into the output
 */
export type FromKV<
  TKv extends readonly KV[],
  TTarget extends AnyObject | null = null
> = TTarget extends null
  ? ExpandRecursively<ConvertToObj<TKv> & AnyObject>
  : ExpandRecursively<ConvertToObj<TKv> & TTarget>;
