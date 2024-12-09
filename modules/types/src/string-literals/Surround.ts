import type { ToStringArray } from "inferred-types/types";

type Process<
  TContent extends string,
  TPrefix extends string,
  TPostfix extends string,
> = `${TPrefix}${TContent}${TPostfix}`;

type ProcessEach<
  TContent extends readonly string[],
  TPrefix extends string,
  TPostfix extends string,
> = {
  [K in keyof TContent]: Process<TContent[K], TPrefix, TPostfix>
};

/**
 * **Surround**`<TContent,TPrefix,TPostfix>`
 *
 * Receives content -- either a string or an array of strings -- and then
 * proceeds to _surround_ the content with the prefix and postfix content.
 *
 * ```ts
 * // "(hi)"
 * type T1 = Surround<"hi", "(", ")">;
 * // [ "<one>", "<two>" ]
 * type T2 = Surround<["one","two"], "<",">">;
 * ```
 */
export type Surround<
  TContent extends string | number | readonly (string | number)[],
  TPrefix extends string,
  TPostfix extends string,
> = TContent extends number
  ? Surround<`${TContent}`, TPrefix, TPostfix>
  : TContent extends readonly unknown[]
    ? TContent extends readonly string[]
      ? ProcessEach<TContent, TPrefix, TPostfix>
      : ProcessEach<
        ToStringArray<TContent> extends readonly string[]
          ? ToStringArray<TContent>
          : never,
        TPrefix,
        TPostfix
      >
    : TContent extends string
      ? Process<TContent, TPrefix, TPostfix>
      : never;
