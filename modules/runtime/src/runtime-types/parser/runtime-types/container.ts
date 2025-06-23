import type { Narrowable } from "inferred-types/types";
import { isArray, isObject, isMap, isSetContainer } from "inferred-types/runtime";
import { AbstractRuntimeType, type BaseRuntimeType } from "./base";

// Create missing type guards
function isSet(val: unknown): val is Set<any> {
  return val instanceof Set;
}

function isWeakMap(val: unknown): val is WeakMap<any, any> {
  return val instanceof WeakMap;
}

export type ContainerTypeKind = 
  | "array" 
  | "tuple" 
  | "set" 
  | "map" 
  | "weakmap" 
  | "record";

/**
 * Runtime type for container types (Array, Set, Map, etc.)
 */
export interface ContainerRuntimeType<T> extends BaseRuntimeType<T> {
  kind: "container";
  containerType: ContainerTypeKind;
  elementType?: BaseRuntimeType<unknown>;
  keyType?: BaseRuntimeType<unknown>;
  valueType?: BaseRuntimeType<unknown>;
  elements?: BaseRuntimeType<unknown>[]; // For tuples
}

/**
 * Implementation of container runtime type
 */
export class ContainerRuntimeTypeImpl<T> 
  extends AbstractRuntimeType<T> 
  implements ContainerRuntimeType<T> {
  
  readonly kind = "container" as const;
  
  constructor(
    token: string,
    type: T,
    public readonly containerType: ContainerTypeKind,
    public readonly elementType?: BaseRuntimeType<unknown>,
    public readonly keyType?: BaseRuntimeType<unknown>,
    public readonly valueType?: BaseRuntimeType<unknown>,
    public readonly elements?: BaseRuntimeType<unknown>[]
  ) {
    super("container", token, type);
  }
  
  extends<V extends Narrowable>(val: V): val is T & V {
    switch (this.containerType) {
      case "array":
        if (!isArray(val)) return false;
        // For arrays, check if all elements match the element type
        if (this.elementType) {
          return val.every(item => this.elementType!.extends(item));
        }
        return true;
        
      case "tuple":
        if (!isArray(val)) return false;
        // For tuples, check exact length and each element type
        if (this.elements) {
          if (val.length !== this.elements.length) return false;
          return val.every((item, index) => 
            this.elements![index]?.extends(item) ?? false
          );
        }
        return true;
        
      case "set":
        if (!isSet(val)) return false;
        // For sets, check if all values match the element type
        if (this.elementType) {
          return Array.from(val).every(item => this.elementType!.extends(item));
        }
        return true;
        
      case "map":
        if (!isMap(val)) return false;
        // For maps, check if all keys and values match their types
        if (this.keyType && this.valueType) {
          for (const [key, value] of val) {
            if (!this.keyType.extends(key) || !this.valueType.extends(value)) {
              return false;
            }
          }
        }
        return true;
        
      case "weakmap":
        if (!isWeakMap(val)) return false;
        // WeakMap keys must be objects, values can be any type
        // We can't iterate WeakMap, so we just check the type
        return true;
        
      case "record":
        if (!isObject(val)) return false;
        // For records, check if all keys and values match their types
        if (this.keyType && this.valueType) {
          return Object.entries(val).every(([key, value]) =>
            this.keyType!.extends(key) && this.valueType!.extends(value)
          );
        }
        return true;
        
      default:
        return false;
    }
  }
  
  equals(other: BaseRuntimeType<unknown>): boolean {
    if (other.kind !== "container") {
      return false;
    }
    
    const otherContainer = other as ContainerRuntimeType<unknown>;
    
    if (otherContainer.containerType !== this.containerType) {
      return false;
    }
    
    // Check element types
    if (this.elementType && otherContainer.elementType) {
      if (!this.elementType.equals(otherContainer.elementType)) {
        return false;
      }
    } else if (this.elementType !== otherContainer.elementType) {
      return false;
    }
    
    // Check key/value types
    if (this.keyType && otherContainer.keyType) {
      if (!this.keyType.equals(otherContainer.keyType)) {
        return false;
      }
    } else if (this.keyType !== otherContainer.keyType) {
      return false;
    }
    
    if (this.valueType && otherContainer.valueType) {
      if (!this.valueType.equals(otherContainer.valueType)) {
        return false;
      }
    } else if (this.valueType !== otherContainer.valueType) {
      return false;
    }
    
    // Check tuple elements
    if (this.elements && otherContainer.elements) {
      if (this.elements.length !== otherContainer.elements.length) {
        return false;
      }
      return this.elements.every((elem, index) =>
        elem.equals(otherContainer.elements![index])
      );
    } else if (this.elements !== otherContainer.elements) {
      return false;
    }
    
    return true;
  }
}

/**
 * Factory functions for creating container runtime types
 */
export const containerRuntimeType = {
  array: <T>(elementType?: BaseRuntimeType<T>) => new ContainerRuntimeTypeImpl(
    elementType ? `Array<${elementType.toString()}>` : "Array<unknown>",
    [] as any,
    "array",
    elementType
  ),
  
  set: <T>(elementType?: BaseRuntimeType<T>) => new ContainerRuntimeTypeImpl(
    elementType ? `Set<${elementType.toString()}>` : "Set<unknown>",
    new Set() as any,
    "set",
    elementType
  ),
  
  map: <K, V>(keyType?: BaseRuntimeType<K>, valueType?: BaseRuntimeType<V>) => new ContainerRuntimeTypeImpl(
    keyType && valueType 
      ? `Map<${keyType.toString()}, ${valueType.toString()}>`
      : "Map<unknown, unknown>",
    new Map() as any,
    "map",
    undefined, // no single element type for maps
    keyType,
    valueType
  ),
  
  weakMap: <K extends object, V>(keyType?: BaseRuntimeType<K>, valueType?: BaseRuntimeType<V>) => new ContainerRuntimeTypeImpl(
    keyType && valueType 
      ? `WeakMap<${keyType.toString()}, ${valueType.toString()}>`
      : "WeakMap<object, unknown>",
    new WeakMap() as any,
    "weakmap",
    undefined,
    keyType,
    valueType
  ),
  
  record: <K extends string | number | symbol, V>(keyType?: BaseRuntimeType<K>, valueType?: BaseRuntimeType<V>) => new ContainerRuntimeTypeImpl(
    keyType && valueType 
      ? `Record<${keyType.toString()}, ${valueType.toString()}>`
      : "Record<string, unknown>",
    {} as any,
    "record",
    undefined,
    keyType,
    valueType
  ),
  
  tuple: (elements: BaseRuntimeType<unknown>[]) => new ContainerRuntimeTypeImpl(
    `[${elements.map(e => e.toString()).join(", ")}]`,
    [] as any,
    "tuple",
    undefined,
    undefined,
    undefined,
    elements
  ),
};