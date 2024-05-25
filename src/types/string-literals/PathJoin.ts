import { 
  Join,
  StartsWith,
  Concat,
  EndsWith,
  First,
  Last
} from "src/types/index";

type Finalize<
  TSegments extends readonly string[],
  TPath extends string
> = Concat<[
  StartsWith<First<TSegments>, "/"> extends true ? "/" : "",
  TPath,
  EndsWith<Last<TSegments>, "/"> extends true ? "/" : ""
]>

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
  TSegments extends readonly string[]
> = Finalize<
  TSegments,
  Join<
    {
      [K in keyof TSegments]: TSegments[K] extends `/${infer End}`
        ? End extends `${infer Both}/`
          ? Both
          : End
        : TSegments[K] extends `${infer Start}/`
          ? Start
          : TSegments[K]
    }, 
    "/"
  >
>

