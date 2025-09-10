import type {
    ExpandRecursively,
    FnWithProps,
    Narrowable,
    ObjectKey,
    TypedFunction,
} from "inferred-types/types";
import { fnProps } from "runtime/functions";

/**
 * **createFnWithProps**`(fn, props)`
 *
 * Creates a strongly typed function along with key/value properties.
 */
export function createFnWithProps<
    const TFn extends TypedFunction<P>,
    const TProps extends Record<ObjectKey, unknown>,
    const P extends readonly Narrowable[],
    const TNarrowing extends boolean = false,
>(
    fn: TFn,
    props: TProps,
    _narrowing: TNarrowing = false as TNarrowing
) {
    let fnWithProps: any = fn;
    const p = {
        ...(fnProps(fn)),
        ...props
    };
    for (const prop of Object.keys(p)) {
        if (prop !== "name") {
            fnWithProps[prop] = p[prop];
        }
    }

    if ("name" in props) {
        fnWithProps = Object.defineProperties(fnWithProps, {
            name: {
                value: p.name,
                writable: false
            }
        });
    }

    return fnWithProps as unknown as ExpandRecursively<
        FnWithProps<
            TFn,
            TProps
        >
    >;
}
