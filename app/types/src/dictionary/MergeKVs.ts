import { Dictionary, EmptyObject } from "../base-types";
import { AfterFirst } from "../lists/AfterFirst";
import { First } from "../lists/First";
import { ExpandRecursively } from "../literals/ExpandRecursively";

type Process<
TInput extends readonly {[key: string]: unknown}[],
TOutput extends Dictionary = EmptyObject
> = [] extends TInput
? TOutput extends Record<string, unknown>
? ExpandRecursively<TOutput> 
: never
: Process<
  AfterFirst<TInput>,
  First<TInput> extends keyof TOutput
  ? TOutput
  : TOutput & First<TInput>
>;

/**
 * **MergeKVs**`<TKVs>`
 * 
 * Receives an array of `Dictionary` types and merges this to 
 * single dictionary.
 * 
 * **Note:** _if key is repeated in the set, only the first one's value will be retained_
 */
export type MergeKVs<
  TInput extends readonly {[key: string]: unknown}[]
> = Process<TInput>
