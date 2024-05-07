import { 
  AfterFirst, 
  First, 
  Split, 
  IsValidDotPath, 
  Container, 
  IsRef, 
  AsRef 
} from "src/types/index";


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
    : IsRef<TContainer> extends true
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
> = IsValidDotPath<TValue,TPath> extends true
? Process<
    TValue,
    Split<TPath,".">
  >
: never;



