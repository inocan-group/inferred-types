import type { Narrowable } from "inferred-types/types";
import { isString, isNumber, isBoolean } from "inferred-types/runtime";
import { AbstractRuntimeType, type BaseRuntimeType } from "./base";

export type LiteralTypeKind = "string" | "number" | "boolean";

/**
 * Runtime type for literal values (narrow string/number/boolean literals)
 */
export interface LiteralRuntimeType<T extends string | number | boolean> extends BaseRuntimeType<T> {
  kind: "literal";
  literalType: LiteralTypeKind;
  isNarrow: boolean;
  value?: T; // Present for narrow literals like String(hello)
  baseType: string | number | boolean;
}

/**
 * Implementation of literal runtime type
 */
export class LiteralRuntimeTypeImpl<T extends string | number | boolean> 
  extends AbstractRuntimeType<T> 
  implements LiteralRuntimeType<T> {
  
  readonly kind = "literal" as const;
  
  constructor(
    token: string,
    type: T,
    public readonly literalType: LiteralTypeKind,
    public readonly isNarrow: boolean,
    public readonly value?: T,
    public readonly baseType: string | number | boolean = 
      literalType === "string" ? "" : 
      literalType === "number" ? 0 : 
      false
  ) {
    super("literal", token, type);
  }
  
  extends<V extends Narrowable>(val: V): val is T & V {
    if (this.isNarrow && this.value !== undefined) {
      // For narrow literals, check exact value match
      return val === this.value;
    }
    
    // For wide literals, check base type
    switch (this.literalType) {
      case "string":
        return isString(val);
      case "number":
        return isNumber(val);
      case "boolean":
        return isBoolean(val);
      default:
        return false;
    }
  }
  
  equals(other: BaseRuntimeType<unknown>): boolean {
    if (other.kind !== "literal") {
      return false;
    }
    
    const otherLiteral = other as LiteralRuntimeType<string | number | boolean>;
    
    return otherLiteral.literalType === this.literalType &&
           otherLiteral.isNarrow === this.isNarrow &&
           otherLiteral.value === this.value;
  }
}

/**
 * Factory functions for creating literal runtime types
 */
export const literalRuntimeType = {
  string: (value?: string) => new LiteralRuntimeTypeImpl(
    value ? `String(${value})` : "string",
    value ?? ("" as any),
    "string",
    value !== undefined,
    value,
    ""
  ),
  
  number: (value?: number) => new LiteralRuntimeTypeImpl(
    value !== undefined ? `Number(${value})` : "number",
    value ?? (0 as any),
    "number",
    value !== undefined,
    value,
    0
  ),
  
  boolean: (value?: boolean) => new LiteralRuntimeTypeImpl(
    value !== undefined ? `Boolean(${value})` : "boolean",
    value ?? (false as any),
    "boolean",
    value !== undefined,
    value,
    false
  ),
};