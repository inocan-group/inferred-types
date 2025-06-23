import type { Narrowable } from "inferred-types/types";
import { isObject } from "inferred-types/runtime";
import { AbstractRuntimeType, type BaseRuntimeType } from "./base";

/**
 * Runtime type for object types with defined properties
 */
export interface ObjectRuntimeType<T extends Record<string, unknown>> extends BaseRuntimeType<T> {
  kind: "object";
  properties: Record<string, BaseRuntimeType<unknown>>;
  requiredKeys: string[];
  optionalKeys: string[];
}

/**
 * Implementation of object runtime type
 */
export class ObjectRuntimeTypeImpl<T extends Record<string, unknown>> 
  extends AbstractRuntimeType<T> 
  implements ObjectRuntimeType<T> {
  
  readonly kind = "object" as const;
  
  constructor(
    token: string,
    type: T,
    public readonly properties: Record<string, BaseRuntimeType<unknown>>,
    public readonly requiredKeys: string[],
    public readonly optionalKeys: string[]
  ) {
    super("object", token, type);
  }
  
  extends<V extends Narrowable>(val: V): val is T & V {
    if (!isObject(val)) return false;
    
    // Check that all required keys are present and match their types
    for (const key of this.requiredKeys) {
      if (!(key in val)) return false;
      const propType = this.properties[key];
      if (propType && !propType.extends(val[key])) return false;
    }
    
    // Check that optional keys, if present, match their types
    for (const key of this.optionalKeys) {
      if (key in val) {
        const propType = this.properties[key];
        if (propType && !propType.extends(val[key])) return false;
      }
    }
    
    // Check that no extra keys are present (strict object matching)
    const allowedKeys = new Set([...this.requiredKeys, ...this.optionalKeys]);
    for (const key of Object.keys(val)) {
      if (!allowedKeys.has(key)) return false;
    }
    
    return true;
  }
  
  equals(other: BaseRuntimeType<unknown>): boolean {
    if (other.kind !== "object") {
      return false;
    }
    
    const otherObject = other as ObjectRuntimeType<Record<string, unknown>>;
    
    // Check if required and optional keys match
    if (this.requiredKeys.length !== otherObject.requiredKeys.length ||
        this.optionalKeys.length !== otherObject.optionalKeys.length) {
      return false;
    }
    
    if (!this.requiredKeys.every(key => otherObject.requiredKeys.includes(key)) ||
        !this.optionalKeys.every(key => otherObject.optionalKeys.includes(key))) {
      return false;
    }
    
    // Check if property types match
    const allKeys = [...this.requiredKeys, ...this.optionalKeys];
    for (const key of allKeys) {
      const thisProp = this.properties[key];
      const otherProp = otherObject.properties[key];
      
      if (!thisProp || !otherProp || !thisProp.equals(otherProp)) {
        return false;
      }
    }
    
    return true;
  }
}

/**
 * Factory function for creating object runtime types
 */
export const objectRuntimeType = {
  create: <T extends Record<string, unknown>>(
    properties: Record<string, BaseRuntimeType<unknown>>,
    requiredKeys: string[] = [],
    optionalKeys: string[] = []
  ) => {
    // Auto-detect required/optional keys if not provided
    const allKeys = Object.keys(properties);
    const finalRequiredKeys = requiredKeys;
    const finalOptionalKeys = optionalKeys;
    
    // Generate token representation
    const keyTokens = allKeys.map(key => {
      const isOptional = finalOptionalKeys.includes(key);
      const propType = properties[key];
      return `${key}${isOptional ? '?' : ''}: ${propType.toString()}`;
    });
    const token = keyTokens.length > 0 ? `{ ${keyTokens.join(', ')} }` : `{}`;
    
    return new ObjectRuntimeTypeImpl(
      token,
      {} as T,
      properties,
      finalRequiredKeys,
      finalOptionalKeys
    );
  }
};