export function isOk<T>(val: T): val is Exclude<T, Error> {
    return val instanceof Error === false;
}
