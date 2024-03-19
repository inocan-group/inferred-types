import { AnyObject, Container, IfEqual, KV, Keys } from "src/types/index";

/**
 * **IsIndexable**`<T>`
 * 
 * Boolean operator which returns whether the true when 
 * T is a container and has _at least_ **one** key known at design
 * time.
 */
export type IsIndexable<T> = 
T extends Container
  ? T extends unknown[]
    ? IfEqual<
        T["length"], number, 
        false, 
        IfEqual<T["length"], 0, false, true>
      >
    : T extends  KV
      ? IfEqual<Keys<T>, number, false, true>
      : false
  : false;
