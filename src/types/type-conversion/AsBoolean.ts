import { ErrorCondition} from "src/types";

export type AsBoolean<T> = T extends boolean
  ? T
  : boolean extends T
  ? T
  : ErrorCondition<
      "invalid-conversion",
      `The AsBoolean<T> utility was provided a variable which was not convertible to boolean!`,
      { context: { variable: T }}
    >;
