import { AnyObject } from "src/types/index";

/**
 * Extracts the _required_ keys in the object's type. You also may
 * optionally filter by the _value_ of the key.
 */
export type RequiredKeys<T extends AnyObject, V = unknown> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]-?: {} extends { [P in K]: T[K] }
    ? never //
    : T[K] extends V
    ? K
    : never;
}[keyof T];
