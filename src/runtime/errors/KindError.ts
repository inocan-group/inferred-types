import { toKebabCase, toPascalCase } from "../literals";
import {
  AfterFirst,
  As,
  CombinedKeys,
  EmptyObject,
  ExpandDictionary,
  First,
  Handle,
  KindError,
  KindErrorDefn,
  MergeObjects,
  Narrowable
} from "inferred-types/dist/types/index";

import { parse } from "error-stack-parser-es/lite";
import { relative } from "pathe";

type Merged<
  TKeys extends readonly string[],
  TBase extends Record<string, unknown>,
  TErr extends Record<string, unknown>,
  TResult extends Record<string, unknown> = EmptyObject
> = [] extends TKeys
? ExpandDictionary<TResult>
: Merged<
    AfterFirst<TKeys>,
    TBase,
    TErr,
    First<TKeys> extends keyof TErr
      ? TResult & Record<First<TKeys>, TErr[First<TKeys>]>
      : First<TKeys> extends keyof TBase
      ? TResult & Record<First<TKeys>, TBase[First<TKeys>]>
      : never
  >;


const IGNORABLES = [
  "@vitest/runner",
  "node:"
]

/**
 * **KindError**
 *
 * A higher order function who's utility is to create a type and context aware
 * error message. The first call defines:
 *
 * - the "kind" used to categorize the error
 * - key/value pairs which represent will eventually be represented
 * in the Error's `context` property.
 *
 * The second call fully applies this function into an Error and takes at
 * minimum a `message` parameter but can also add a second parameter to
 * add to the "context" which the error conveys.
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
export function kindError<
  TKind extends string,
  TBaseContext extends Record<string, BC>,
  BC extends Narrowable = Narrowable
>(
  kind: TKind,
  baseContext: TBaseContext = {} as EmptyObject as TBaseContext
): KindErrorDefn<
  TKind,
  TBaseContext
> {
  return <
    TErrContext extends Record<string, C> = EmptyObject,
    C extends Narrowable = Narrowable
  >(
    msg: string,
    context: TErrContext = {} as EmptyObject as TErrContext
    ): KindError<
      TKind,
      Merged<
        As<CombinedKeys<TBaseContext,TErrContext>, readonly string[]>,
        TBaseContext,TErrContext
      >
    > => {
      const err = new Error(msg) as Partial<
        KindError<
          typeof kind, Handle<TBaseContext, undefined, EmptyObject, "equals">
        >
      >;
      const stackTrace = parse(err as Error)
        .filter(i => !IGNORABLES.some(has => i.file && i.file.includes(has)))
        .map(i => ({
          ...i,
          file: i.file
          ? relative(process.cwd(), i.file)
          : undefined
      }));

      err.name = toPascalCase(kind);
      err.kind = toKebabCase(kind);
      err.file = stackTrace[0].file;
      err.line = stackTrace[0].line;
      err.col = stackTrace[0].col;
      err.stackTrace = stackTrace;
      err.__kind = "KindError";
      err.context = {
        ...baseContext,
        ...context
      };

      return err as unknown as KindError<
        TKind,
        MergeObjects<TBaseContext,TErrContext>
      >;
  };
}


