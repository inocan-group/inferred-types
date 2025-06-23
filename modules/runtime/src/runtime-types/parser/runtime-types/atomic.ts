import type { Narrowable } from "inferred-types/types";
import { 
  isNull, 
  isUndefined, 
  isBoolean, 
  isTrue, 
  isFalse, 
  isString, 
  isNumber, 
  isObject, 
  isSymbol 
} from "inferred-types/runtime";
import { AbstractRuntimeType, type BaseRuntimeType } from "./base";

export type AtomicTypeKind = 
  | "null" 
  | "undefined" 
  | "boolean" 
  | "true" 
  | "false" 
  | "string" 
  | "number" 
  | "object" 
  | "symbol";

/**
 * Runtime type for atomic values (primitives and their literal variants)
 */
export interface AtomicRuntimeType<T extends Narrowable> extends BaseRuntimeType<T> {
  kind: "atomic";
  atomicType: AtomicTypeKind;
}

/**
 * Implementation of atomic runtime type
 */
export class AtomicRuntimeTypeImpl<T extends Narrowable> 
  extends AbstractRuntimeType<T> 
  implements AtomicRuntimeType<T> {
  
  readonly kind = "atomic" as const;
  
  constructor(
    token: string,
    type: T,
    public readonly atomicType: AtomicTypeKind
  ) {
    super("atomic", token, type);
  }
  
  extends<V extends Narrowable>(val: V): val is T & V {
    switch (this.atomicType) {
      case "null":
        return isNull(val);
      case "undefined":
        return isUndefined(val);
      case "boolean":
        return isBoolean(val);
      case "true":
        return isTrue(val);
      case "false":
        return isFalse(val);
      case "string":
        return isString(val);
      case "number":
        return isNumber(val);
      case "object":
        return isObject(val);
      case "symbol":
        return isSymbol(val);
      default:
        return false;
    }
  }
  
  equals(other: BaseRuntimeType<unknown>): boolean {
    return other.kind === "atomic" && 
           (other as AtomicRuntimeType<unknown>).atomicType === this.atomicType;
  }
}

/**
 * Factory functions for creating atomic runtime types
 */
export const atomicRuntimeType = {
  null: () => new AtomicRuntimeTypeImpl("null", null as any, "null"),
  undefined: () => new AtomicRuntimeTypeImpl("undefined", undefined as any, "undefined"),
  boolean: () => new AtomicRuntimeTypeImpl("boolean", true as any, "boolean"), // boolean type
  true: () => new AtomicRuntimeTypeImpl("true", true as any, "true"),
  false: () => new AtomicRuntimeTypeImpl("false", false as any, "false"),
  string: () => new AtomicRuntimeTypeImpl("string", "" as any, "string"), // string type
  number: () => new AtomicRuntimeTypeImpl("number", 0 as any, "number"), // number type
  object: () => new AtomicRuntimeTypeImpl("object", {} as any, "object"), // object type
  symbol: () => new AtomicRuntimeTypeImpl("symbol", Symbol() as any, "symbol"), // symbol type
};