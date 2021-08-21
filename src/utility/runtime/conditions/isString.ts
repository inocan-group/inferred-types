export function isString<T>(i: T) {
  return (typeof i === "string") as T extends string ? true : false;
}
