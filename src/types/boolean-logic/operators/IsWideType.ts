/* eslint-disable @typescript-eslint/no-explicit-any */
import { IfLiteral, IfLiteralKind, Type } from "src/types";


type WideLiterals = string | number | boolean | Record<string,any>;

/**
 * **IsWideType**`<T>`
 */
export type IsWideType<T> = T extends WideLiterals 
  ? IfLiteral<T, false, true>
  : T extends Type<any>
    ? T extends Type<infer Kind>
      ? IfLiteralKind<Kind, false, true>
      : never
    : never;
