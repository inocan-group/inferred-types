import { DoesExtend } from "./DoesExtend";
import { IsNever } from "./IsNever";

/**
 * **Extends**`<T,U>`
 *
 * A boolean operator which checks whether `T` extends `U` and returns
 * **true** or **false**. This is an _alias_ for `DoesExtend`.
 */
export type Extends<T,U> = IsNever<T> extends true
? IsNever<U> extends true
  ? true
  : false
: DoesExtend<T,U>;
