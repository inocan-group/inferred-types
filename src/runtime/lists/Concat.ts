import { AfterFirst } from "src/types/lists/AfterFirst";
import { First } from "src/types/lists/First";

type ConcatElements = readonly (string | number | boolean)[] | ((string | number | boolean)[]);

type ConcatAcc<
  T extends readonly ConcatElements, 
  Result extends string = ""
> = [] extends T
    ? Result
    : ConcatAcc<AfterFirst<T>, `${Result}${First<T>}`>;

export type Concat<T extends ConcatElements> = ConcatAcc<T>;

