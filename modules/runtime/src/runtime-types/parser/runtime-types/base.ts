import type { Narrowable } from "inferred-types/types";

/**
 * Base interface for all runtime types
 */
export interface BaseRuntimeType<T extends Narrowable = Narrowable> {
  readonly kind: string;
  readonly token: string;
  readonly type: T;
  
  /**
   * Type guard to check if a value extends this type
   */
  extends<V extends Narrowable>(val: V): val is T & V;
  
  /**
   * Check if this type equals another runtime type
   */
  equals(other: BaseRuntimeType<unknown>): boolean;
  
  /**
   * Convert back to string token representation
   */
  toString(): string;
}

/**
 * Abstract base class implementing common functionality
 */
export abstract class AbstractRuntimeType<T extends Narrowable = Narrowable> 
  implements BaseRuntimeType<T> {
  
  constructor(
    public readonly kind: string,
    public readonly token: string,
    public readonly type: T
  ) {}
  
  abstract extends<V extends Narrowable>(val: V): val is T & V;
  
  equals(other: BaseRuntimeType<unknown>): boolean {
    // Default implementation: compare tokens
    return this.token === other.token;
  }
  
  toString(): string {
    return this.token;
  }
}