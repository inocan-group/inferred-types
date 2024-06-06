import {
  AfterFirst,
  ComparatorOperation,
  Compare,
  Container,
  Dictionary,
  First,
  IsEqual,
  Or,
  Values,
  WhenNever
} from "src/types/index";

type Process<
TElements extends readonly unknown[],
TOp extends ComparatorOperation,
TComparator
> = [] extends TElements
? false
: [WhenNever<Compare<First<TElements>, TOp, TComparator>>] extends [true]
  ? true
  : Process<
      AfterFirst<TElements>,
      TOp,
      TComparator
    >;


export type Some<
  TContainer extends Container,
  TOp extends "extends" | "equals" | "startsWith" | "endsWith" | "lessThan" | "greaterThan",
  TComparator extends Or<[
    IsEqual<TOp,"startsWith">, IsEqual<TOp,"endsWith">,
  ]> extends true
  ? string
  : Or<[IsEqual<TOp,"lessThan">, IsEqual<TOp,"greaterThan">]> extends true
  ? number
  : unknown
> = TContainer extends readonly unknown[]
? Process<TContainer,TOp,TComparator>
: TContainer extends Dictionary
? Process<Values<TContainer>, TOp, TComparator>
: never;
