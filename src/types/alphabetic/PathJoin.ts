import { IfLiteral } from "../boolean-logic";
import { AfterFirst, First } from "../lists";
import { StripTrailing } from "./StripTrailing";
import { StripLeading } from "./StripLeading";

/**
 * **PathJoin**`<T,U>`
 *
 * Type utility meant to bring 2 or more "path" strings together into
 * a valid "path". Where a "path" is represented as nothing more than
 * string characters delimited by a Posix `\` character.
 *
 * Note that the first part of the path will retain it's `\` if present
 * and the last one will preserve it's `\` character if present. You can
 * combine this utility with `EnsureTrailing<T>`, `StripTrailing<T>`,
 * `EnsureStarting<T>`, and `StripStarting<T>` to further shape
 * the type.
 */
export type PathJoin<
  // leading string
  T extends string,
  // trailing string or strings
  U extends string | readonly string[]
> = U extends readonly string[]
  ? // eslint-disable-next-line no-use-before-define
    PathMultiJoin<PathJoin<T, "">, [...U]>
  : U extends string
  ? IfLiteral<
      T,
      // Literal T guaranteed
      IfLiteral<
        // conditional
        U,
        `${StripTrailing<T, "/">}/${StripLeading<U, "/">}`,
        `${StripTrailing<T, "/">}/${string}`
      >,
      // wide `T` encountered
      IfLiteral<U, `${string}${U}`, string>
    >
  : never;

type PathMultiJoin<
  TProcessed extends string,
  TRemaining extends readonly string[]
> = [] extends TRemaining
  ? TProcessed
  : PathMultiJoin<
      // add to the TProcessed string
      PathJoin<TProcessed, First<TRemaining>>,
      // remaining elements after extracting head element
      AfterFirst<TRemaining>
    >;
