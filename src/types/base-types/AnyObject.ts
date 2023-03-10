/* eslint-disable @typescript-eslint/no-explicit-any */
import { IndexableObject } from "./IndexableObject";

/**
 * **AnyObject**
 * 
 * Meant to represent any valid object type (both indexable and not).
 */
export type AnyObject = IndexableObject | object | Record<string, any>;

