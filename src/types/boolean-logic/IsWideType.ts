import { IfLiteral } from "../../types";
import { IfLiteralKind, Type } from "../runtime-types";

type WideLiterals = string | number | boolean | Record<string,any>;

/**
 * 
 */
export type IsWideType<T> = T extends WideLiterals 
  ? IfLiteral<T, false, true>
  : T extends Type<any>
    ? T extends Type<infer Kind>
      ? IfLiteralKind<Kind, false, true>
      : never
    : never;
