import { AnyFunction, Dictionary, FnProps } from "inferred-types/types";

/**
 * **fnProps**`(fn)`
 *
 * Extracts any key/value pairs found along with the function.
 */
export function fnProps<T extends AnyFunction>(fn: T) {
    const names = Object.getOwnPropertyNames(fn);
    const props: Dictionary = {};

    for (const key of names) {
        if(!["name","length"].includes(key)) {
            props[key] = fn[key as keyof typeof fn];
        } else if(key === "name" && fn[key as keyof typeof fn] !== "") {
            props[key] = fn[key as keyof typeof fn];
        }
    }

    return props as FnProps<T>;
}
