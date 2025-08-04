import type { IsAny, IsNever } from "inferred-types/types";

/**
 * **IsEmptyObject**`<T>`
 *
 * - T must be an object (but not a function and not an array/tuple)
 * - T must expose **no known keys** (`keyof T` is `never`)
 * - `any`, `unknown`, and `never` are rejected
 */
export type IsEmptyObject<T>
  = IsAny<T> extends true ? false
      : IsNever<T> extends true ? false
      // `unknown` is not assignable to object; this branch will be false
          : T extends object
              ? T extends (...args: any) => any ? false
                  : T extends readonly any[] ? false
                      : [keyof T] extends [never]
                          ? T extends { [x: string]: any }
                              ? false  // has index signature
                              : true   // truly empty object
                          : false
              : false;
