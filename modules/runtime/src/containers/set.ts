
import type { Dictionary, DotPathFor, ObjectKey, Suggest, Narrowable, Set } from "inferred-types/types";

/**
 * Sets a value at the specified dot path in a container, returning a new container with the mutation applied.
 *
 * @param container - The container (object or array) to mutate
 * @param dotPath - The dot path where to set the value (supports nested paths like "foo.bar.baz")
 * @param value - The value to set at the specified path
 * @returns A new container with the mutation applied
 */
export function set<
    const TContainer extends Dictionary<ObjectKey, Narrowable> | readonly Narrowable[],
    const TDotpath extends Suggest<DotPathFor<TContainer>>,
    const TValue extends Narrowable,
>(
    container: TContainer,
    dotPath: TDotpath,
    value: TValue
): Set<TContainer,TDotpath,TValue> {
    // Strip leading dot from path
    const normalizedPath = String(dotPath).startsWith('.')
        ? String(dotPath).slice(1)
        : String(dotPath);

    // Split the path into segments
    const pathSegments = normalizedPath.split('.');

    // Helper function to recursively set the value
    function setRecursive(obj: any, segments: string[], val: any): any {
        if (segments.length === 1) {
            // Base case: set the value at the current key
            const key = segments[0];

            if (Array.isArray(obj)) {
                // Handle array mutation
                const newArr = [...obj];
                const index = parseInt(key, 10);
                if (!isNaN(index)) {
                    newArr[index] = val;
                }
                return newArr;
            } else {
                // Handle object mutation
                return {
                    ...obj,
                    [key]: val
                };
            }
        } else {
            // Recursive case: navigate deeper
            const [head, ...tail] = segments;

            if (Array.isArray(obj)) {
                // Handle array navigation
                const newArr = [...obj];
                const index = parseInt(head, 10);
                if (!isNaN(index)) {
                    newArr[index] = setRecursive(
                        obj[index] || {},
                        tail,
                        val
                    );
                }
                return newArr;
            } else {
                // Handle object navigation
                return {
                    ...obj,
                    [head]: setRecursive(
                        obj?.[head] || {},
                        tail,
                        val
                    )
                };
            }
        }
    }

    return setRecursive(container, pathSegments, value) as Set<TContainer,TDotpath,TValue>;
}
