import { toKebabCase, toPascalCase } from "../literals";
import { IfUndefined, KindError, KindErrorDefn } from "src/types/index";

/**
 * **KindError**
 * 
 * An error which:
 * 
 * - must have a "kind" type defined which can be used to categorize the error
 * - is allowed to express other key/value pairs in the `context` property
 * 
 * This error is generated with the `kindError(kind, _defineContext) => (msg, ctx)`
 * higher order function.
 * 
 * ```ts
 * // Defines the Error
 * const BadJuju = kindError("bad-juju", { flavor?: "" });
 * // BadJuju { 
 * //     name: BadJuju; 
 * //     kind: "bad-juju"; 
 * //     msg: "oh my god!"; 
 * //     context: { flavor?: string} 
 * // }
 * BadJuju("oh my god!");
 * BadJuju("oh my god!", { flavor: "strawberry"})
 * ```
 */
export const kindError = <
  K extends string,
  C extends Record<string, unknown> = NonNullable<unknown>
>(
  kind: K, 
  _defineContext?: C
): KindErrorDefn<K,C> => 
(
  msg: string, 
  context?: C
): KindError<K,C> => {

  const err = new Error(msg) as Partial<
    KindError<
      typeof kind, 
      IfUndefined<C, NonNullable<unknown>>
    >
  >;
  err.name = toPascalCase(kind);
  err.kind = toKebabCase(kind);
  err.__kind = "KindError";
  err.context = context as IfUndefined<C, NonNullable<unknown>>;

  return err as KindError<K,C>
}


