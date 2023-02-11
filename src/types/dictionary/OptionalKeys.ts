/* eslint-disable @typescript-eslint/ban-types */
/**
 * **OptionalKeys**`<T>`
 * 
 * Extracts the _optional_ keys in the object's type. 
 */
export type OptionalKeys<T extends object> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] }
    ? K
    : never;
}[keyof T];
