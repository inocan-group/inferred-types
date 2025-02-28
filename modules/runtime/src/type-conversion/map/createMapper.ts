import type {
    AnyObject,
    ObjectMap,
    ObjectMapConversion,
} from "inferred-types/types";
import {
    createFnWithPropsExplicit,
    isFunction,
} from "inferred-types/runtime";

export type Mapper<
    TFrom extends AnyObject,
    TTo,
> = (
  <TInput extends TFrom>(from: TInput) => TTo
) & {
    kind: "Mapper";
    map: <TInput extends readonly TFrom[]>(from: TInput) => {
        [K in keyof TInput]: TTo
    };
};

function asMapper<
    TFrom extends AnyObject,
    TTo extends AnyObject,
    TFn extends <TInput extends TFrom>(cb: TInput) => {
        [K in keyof TInput]: TTo
    },
>(fn: TFn): Mapper<TFrom, TTo> {
    const props = {
        kind: "Mapper",
        map: <TInput extends readonly TFrom[]>(from: TInput) => {
            return from.map(fn);
        },
    };

    return createFnWithPropsExplicit(fn, props) as unknown as Mapper<
        TFrom,
        TTo
    >;
}

export function createObjectMap<
    TFrom extends AnyObject,
    TTo extends AnyObject,
>() {
    return <TMap extends ObjectMap<TFrom, TTo>>(map: TMap) => {
        const fn: ObjectMapConversion<TFrom, TTo, TMap> = (input) => {
            return (Object.keys(map) as unknown as readonly (keyof TMap)[]).reduce(
                (acc, key) => {
                    const val = map[key];
                    return {
                        ...acc,
                        [key]: isFunction(val)
                            ? val(input)
                            : val,
                    };
                },
                {} as ReturnType<ObjectMapConversion<TFrom, TTo, TMap>>,
            );
        };

        return fn as ObjectMapConversion<TFrom, TTo, TMap>;
    };
}

export function createMapper<
    TFrom extends AnyObject,
    TTo extends AnyObject,
>() {
    return <TFn extends <TInput extends TFrom>(cb: TInput) => {
        [K in keyof TInput]: TTo
    }>(
        fn: TFn,
    ) => {
        return asMapper<TFrom, TTo, TFn>(fn);
    };
}
