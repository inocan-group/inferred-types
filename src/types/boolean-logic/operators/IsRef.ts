import { Length } from "src/types/index";

/**
 * **IsRef**`<T>`
 * 
 * Boolean type utility that detects whether the type passed in
 * is a VueJS `Ref<...>` type.
 */
export type IsRef<T> = T extends { value: unknown } 
  ? Length<T> extends 2 // this is a "real" Ref<T>
    ? true
    : Length<T> extends 1 // this ia a "fake" Ref<T>, aka VueRef<T>
      ? true
      : false
  : false;
