import {  Throw} from "src/types/index";

export type AsBoolean<T> = T extends boolean
  ? T
  : boolean extends T
  ? T
  : Throw<
      "invalid-conversion",
      `The AsBoolean<T> utility was provided a variable which was not convertible to boolean!`,
      "AsBoolean",
      { value: T }
    >;
