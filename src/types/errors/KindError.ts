import {
  PascalCase,
  KebabCase,
  EmptyObject,
  Narrowable,
  MergeObjects,
  StripChars
} from "inferred-types/dist/types/index";
import { StackFrame } from "error-stack-parser-es";

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
  TKind extends string,
  TContext extends Record<string, unknown> = EmptyObject
> extends Error  {
  __kind: "KindError";
  name: PascalCase<TKind>;
  kind: KebabCase<StripChars<TKind, "<"|">"| "["| "]"| "("|")">>;
  file?: string;
  line?: number;
  col?: number;
  context: TContext;
  stackTrace: StackFrame[];
}

/**
 * **KindErrorDefn**`<K,C>`
 *
 * A definition for a `KindError`. Simply call this function to
 * turn it into a `KindError` as specified by this definition.
 */
export type KindErrorDefn<
  TKind extends string,
  TBase extends Record<string, BC>,
  BC extends Narrowable = Narrowable
> = <
  TContext extends Record<string, C>,
  C extends Narrowable
>(
  msg: string,
  context?: TContext
) => KindError<
  TKind,
  MergeObjects<TBase, TContext>
>;
