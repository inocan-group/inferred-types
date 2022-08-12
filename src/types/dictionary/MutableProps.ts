import { ExpandRecursively } from "../ExpandRecursively";
import { Keys } from "../Keys";
import { Mutable } from "../Mutable";

/**
 * Given a dictionary of type `<T>`, this utility function will
 * make the `<M>` generic property _mutable_ and all other _read-only_.
 *
 * ```ts
 * // { foo: string, bar?: Readonly<number> }
 * type Example = MutableProps<{
 *    foo: Readonly<string>,
 *    bar?: number
 * }, "foo">;
 * ```
 */
export type MutableProps<T extends {}, M extends keyof T & string> = ExpandRecursively<
  Mutable<Pick<T, M>> & Readonly<Pick<T, Keys<T, M>>>
>;
