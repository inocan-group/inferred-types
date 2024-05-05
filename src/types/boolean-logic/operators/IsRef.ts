import { If, Keys,  Retain, SameElements } from "src/types/index";



/**
 * **IsRef**`<T>`
 * 
 * Boolean type utility that detects whether the type passed in
 * is a VueJS `Ref<...>` type or this library's `VueRef<...>`
 * (which serves as a lightweight proxy type for Vue's `Ref`).
 */
export type IsRef<T> = T extends object 
  ? If<
      SameElements<
        Retain<Keys<T>, string>,
        ["value"]
      >,
      true,
      false
    >
  : false;
