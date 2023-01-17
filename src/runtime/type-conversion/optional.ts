/**
 * **optional**(value)
 * 
 * A function which takes the value `T` and makes sure it
 * includes a union with _undefined_.
 */
export function optional<T>(value: T): T | undefined {
  return value as T | undefined;
}
