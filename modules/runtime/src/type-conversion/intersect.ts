/**
 * **intersect**(value, intersectedWith)
 *
 * Runtime utility which receives `value` property and returns it with an
 * unchanged _runtime_ value but with the type now intersected with the
 * value provided by `intersectedWith`.
 */
export function intersect<T, U>(value: T, _intersectedWith: U): T & U {
    return value as T & U;
}
