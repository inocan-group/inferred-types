export function isUndefined<T>(i: T) {
  return (typeof i === "undefined") as undefined extends T ? true : false;
}
