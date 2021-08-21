export function isNumber<T>(i: T) {
  return (typeof i === "number") as T extends number ? true : false;
}
