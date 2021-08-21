export function isNull<T>(i: T) {
  return (i === null) as T extends null ? true : false;
}
