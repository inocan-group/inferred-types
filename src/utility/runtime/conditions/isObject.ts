export type IsObject<T> = T extends {} ? true : false;

export function isObject<T>(i: T) {
  return (typeof i === "object" && i !== null && Array.isArray(i) === false) as IsObject<T>;
}
