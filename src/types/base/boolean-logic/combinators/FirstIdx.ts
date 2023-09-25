import { Tuple } from "src/types";

export type FirstAsOperations = 
| "truthy" 
| "falsy" 
| "null" 
| "undefined" 
| "object"
| "EmptyObject"
| readonly unknown[];

/**
 * **FirstIdx**`<TTypes,TFind> → numeric-literal`
 * 
 * Provides a numeric index of where the first occurrence was found
 * of the given "set". You can use the built-in sets or add a `Tuple`
 * as the operational set
 */
export type FirstIdx<
  TTypes extends Tuple,
  TFind extends FirstAsOperations
> = any;


type T = FirstIdx<[1,2,3,"foo"], "truthy">;
