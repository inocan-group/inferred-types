import {  And, AsObject, AsTuple, Container, IfAnd, IfEqual,  IsObjectLiteral, IsTuple, Keys, ObjectKey, TupleToUnion } from "src/types/index"

type ProcessTuple<
  A extends readonly unknown[],
  B extends readonly unknown[],
> = IfEqual<
  TupleToUnion<A>,
  TupleToUnion<B>,
  true,
  false
>;

type ProcessObj<
  A extends readonly ObjectKey[],
  B extends readonly ObjectKey[],
> = A["length"] extends B["length"]
? And<{
  [K in keyof A]: K extends keyof B
    ? true
    : false
}>
: false;

/**
 * **SameKeys**`<A,B>`
 * 
 * Compares two lists to see if they have the same keys.
 */
export type SameKeys<
  A extends Container,
  B extends Container
> = IfAnd<
  [IsTuple<A>,IsTuple<B>],
  AsTuple<A>["length"] extends AsTuple<B>["length"]
    ? ProcessTuple<AsTuple<A>,AsTuple<B>>
    : false,
  IfAnd<
    [ IsObjectLiteral<A>, IsObjectLiteral<B> ],
    ProcessObj<Keys<AsObject<A>>,Keys<AsObject<B>>>,
    false
  >
>;
