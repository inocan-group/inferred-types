import { Get } from "../dictionary/Get";

/**
 * Create a union type based on a given property in an array of objects
 */
export type UniqueForProp<T extends readonly Record<string, any>[], P extends string> = Readonly<
  Get<T[number], P>
>;
