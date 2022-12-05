import { IfLiteral } from "../boolean-logic";
import { StripEnding } from "./StripEnding";
import { StripStarting } from "./StripStarting";
/**
 * **PathJoin**`<T,U>`
 *
 * Type utility which joins two strings together with the
 * goal of making it a valid file or URI path (based on the
 * Posix standard for file paths).
 *
 * Primarily, this means that it ensures that both `T` and `U`
 * are separated by a single `/` character. Of course if either
 * `T` or `U` are _wide_ string types then the resulting type
 * will be more limited.
 *
 * **Note:** that in the case that both `T` and `U` are wide,
 * we opt to type the result as just a _string_ rather than
 * `${string}/${string}` which might be more precise 99% of
 * the time but where `T` is an empty string there actually
 * is no guarantee of a `/` character. Similarly we must
 * type the case where `U` is narrow but `T` is wide as
 * being `${string}${U}` instead of `${string}/${U}`.
 */
export type PathJoin<
  // leading string
  T extends string,
  // trailing string
  U extends string
> = IfLiteral<
  T,
  // Literal T guaranteed
  IfLiteral<
    // conditional
    U,
    `${StripEnding<T, "/">}/${StripStarting<U, "/">}`,
    `${StripEnding<T, "/">}/${string}`
  >,
  // wide `T` encountered
  IfLiteral<U, `${string}${U}`, string>
>;
