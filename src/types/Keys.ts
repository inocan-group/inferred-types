/** shorthand for `keyof T`  but also enforces that the key be a _string_ */
export type Keys<T extends {}> = keyof T & string;
