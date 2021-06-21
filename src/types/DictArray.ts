/**
 * Represents an object in an iterable array which preserves strong typing.
 * 
 * > Note: this is output artifact of the `dictToArray()` utility fn
 */
export type DictArray<T> = Array<{ [K in keyof T]: [K, Pick<T, K>] }[keyof T]>;
