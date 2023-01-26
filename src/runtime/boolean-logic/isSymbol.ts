export function isSymbol<T>(i: T) {
  return (typeof i === "symbol") as T extends symbol ? true : false;
}
