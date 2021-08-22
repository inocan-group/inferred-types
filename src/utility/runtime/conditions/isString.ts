export type IsString<T> = T extends string ? true : false;

export function isString<T>(i: T) {
  return (typeof i === "string") as IsString<T>;
}
