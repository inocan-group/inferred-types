import {PascalCase, KebabCase} from "inferred-types/dist/types/index";

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
export interface KindError<
  K extends string,
  C extends Record<string, unknown> | undefined = Record<string, unknown> | undefined
> extends Error  {
  __kind: "KindError";
  name: PascalCase<K>;
  kind: KebabCase<K>;
  context: C;
}

/**
 * **KindErrorDefn**`<K,C>`
 *
 * A definition for a `KindError`. Simply call this function to
 * turn it into a `KindError` as specified by this definition.
 */
export type KindErrorDefn<
  K extends string,
  C extends Record<string, unknown> = NonNullable<unknown>
> = (
  msg: string,
  context?: C
) => KindError<K,C>;
