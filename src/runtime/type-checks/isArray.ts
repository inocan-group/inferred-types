export type IsArray<T> = T extends any[] ? true : false;

export function isArray<T>(i: T) {
  return (Array.isArray(i) === true) as IsArray<T>;
}
