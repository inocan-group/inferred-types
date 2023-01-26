export type IsNumber<T> = T extends number ? true : false;

export function isNumber<T extends number>(value: unknown): value is T {
  return (typeof value === "number");
}
