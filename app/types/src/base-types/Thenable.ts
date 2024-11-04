import { Dictionary } from "./Dictionary";

/**
 * **Thenable**`<T>`
 *
 * An object which resembles a promise and is guarenteed to provide a `.then` and `.catch`
 * callback hook.
 */
export type Thenable<T = unknown> = Dictionary & {
  then: (cb: T) => void;
  catch: (err: string) => void;
}
