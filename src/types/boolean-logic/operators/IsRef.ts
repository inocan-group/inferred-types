import { Contains, If, IsLength,  ObjectKey,  RemoveIndexKeys,  Retain, UnionToTuple } from "src/types/index";

type Get<T extends object> = UnionToTuple<keyof RemoveIndexKeys<T>> extends 
readonly ObjectKey[]
  ? UnionToTuple<keyof RemoveIndexKeys<T>>
  : never;


/**
 * **IsRef**`<T>`
 * 
 * Boolean type utility that detects whether the type passed in
 * is a VueJS `Ref<...>` type or this library's `VueRef<...>`
 * (which serves as a lightweight proxy type for Vue's `Ref`).
 */
export type IsRef<T> = T extends object
? If<
    IsLength<Retain<Get<T>, string>, 1>,
    If<
      Contains<Get<T>,"value">,
      true,
      false
    >,
    false
  >
: false;
