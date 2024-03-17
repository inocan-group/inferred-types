import { AfterFirst } from "../lists/AfterFirst";
import { First } from "../lists/First";
import { ExpandRecursively } from "../literals/ExpandRecursively";

/**
 * **MergeKVs**`<TKVs>`
 * 
 * Receives an array of KV pairs and converts this to 
 * single KV dictionary.
 * 
 * **Note:** _if key is repeated in the set, only the first one's value will be retained_
 */
export type MergeKVs<
  TInput extends readonly {[key: string]: unknown}[],
  TOutput extends {[key: string]: unknown} = NonNullable<unknown>
> = [] extends TInput
? TOutput extends Record<string, unknown>
  ? ExpandRecursively<TOutput> 
  : never
: MergeKVs<
    AfterFirst<TInput>,
    First<TInput> extends keyof TOutput
    ? TOutput
    : TOutput & First<TInput>
  >;
