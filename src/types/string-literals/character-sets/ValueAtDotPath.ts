import {
  AfterFirst,
  First,
  Split,
  IsValidDotPath,
  Container,
  IsVueRef,
  AsRef,
  IsLiteral,
  IsStringLiteral
} from "inferred-types/types";


type Process<
    TContainer extends Container,
    TIndexes extends readonly string[]
> = [] extends TIndexes
  ? TContainer
  : First<TIndexes> extends keyof TContainer
    ? TContainer[First<TIndexes>] extends Container
      ? Process<
          TContainer[First<TIndexes>],
          AfterFirst<TIndexes>
        >
      : AfterFirst<TIndexes>["length"] extends 0
        ? TContainer[First<TIndexes>]
        : false
    : IsVueRef<TContainer> extends true
      ? First<TIndexes> extends keyof AsRef<TContainer>["value"]
        ? TIndexes["length"] extends 1
          ? AsRef<TContainer>["value"][First<TIndexes>]
          : AsRef<TContainer>["value"][First<TIndexes>] extends Container
            ? Process<
                AsRef<TContainer>["value"][First<TIndexes>],
                AfterFirst<TIndexes>
              >
            : AfterFirst<TIndexes>["length"] extends 0
              ? AsRef<TContainer>["value"][First<TIndexes>]
              : false
        : false
      : false; // not a ref


export type ValueAtDotPath<
  TValue extends Container,
  TPath extends string
> = [IsValidDotPath<TValue,TPath>] extends [true]
? IsLiteral<TValue> extends true
  ? IsStringLiteral<TPath> extends true
    ? Split<TPath,"."> extends readonly string[]
      ? Process<
          TValue,
          Split<TPath,".">
        >
      : never
    : string
  : string
: never;



