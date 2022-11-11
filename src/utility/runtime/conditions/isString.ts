export type IsString<T> = T extends string ? true : false;

export function isString<T>(i: T) {
  return (typeof i === "string") as IsString<T>;
}

export function ifString<T, IF, ELSE>(val: T, ifVal: IF, elseVal: ELSE) {
  return (isString(val) ? ifVal : elseVal) as IsString<T> extends true ? IF : ELSE;
}
