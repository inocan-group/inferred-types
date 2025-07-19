import { IsEqual, Not } from "types/boolean-logic";

declare const BrandSymbol: unique symbol;

export type Brand<
    Base,
    Kind
> = Base & { [BrandSymbol]: Kind };



export type Unbrand<T> = T extends Brand<infer B, any> ? B : T;


export type IsBranded<T> = Not<IsEqual<T, Unbrand<T>>>;
