import {  Abs, IsGreaterThan, If, Negative, Add, IsNegativeNumber } from "src/types/index";

type Iterate<T extends number, A extends number[] = []> = A["length"] extends T
  ? A
  : Iterate<T, [...A, A["length"]]>;

type LengthDiff<A extends unknown[], B extends unknown[]> = A extends [
  unknown,
  ...infer ATail
]
  ? B extends [unknown, ...infer BTail]
    ? LengthDiff<ATail, BTail>
    : A["length"]
  : B extends []
  ? 0
  : never;


export type Subtract<
  A extends number , 
  B extends number 
> = 
If<
  IsNegativeNumber<B>,  // second operand is negative so switch to addition
  Add<A,Abs<B>>,

  If<
    IsGreaterThan<A, B>,
    LengthDiff<
      Iterate<A>,
      Iterate<B>
    >,
    Negative<LengthDiff<
      Iterate<B>,
      Iterate<A>
    >>
  >
>;
