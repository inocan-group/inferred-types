import type {
    AnyObject,
    DefineObject,
    ErrMsg,
    FromDefineObject,
    HandleDoneFn,
    Narrowable,
    ObjectApiCallback,
    ObjectToApi,
} from "inferred-types/types";
import { createFnWithProps, handleDoneFn } from "inferred-types/runtime";

export function objectToApi<
    TObj extends Record<string, N>,
    N extends Narrowable,
    TDef = never,
>(
    obj: TObj,
    def: TDef = null as never as TDef,
): ObjectToApi<TObj, TDef> {
    const transformed = Object.keys(obj).reduce(
        (acc, key) => {
            const val = obj[key as keyof typeof obj];
            return {
                ...acc,
                [key]: () => val,
            };
        },
        {},
    );

    const api = {
        __kind: "ObjectApi",
        done: (): TDef => def,
        ...transformed,
    } as unknown as ObjectToApi<TObj, TDef>;

    return api;
}

type MapperReturns<
    TInput extends AnyObject,
    TOutput extends AnyObject,
    T extends ObjectApiCallback<any, any>,
> = HandleDoneFn<ReturnType<T>> extends TOutput
    ? HandleDoneFn<ReturnType<T>>
    : ErrMsg<"invalid-mapper", { input: TInput; output: TOutput }>;

/** creates a mapping between the input and output types */
function mapper<
    TInput extends AnyObject,
    TOutput extends AnyObject,
>() {
    type Callback = ObjectApiCallback<TInput>;

    return <T extends Callback>(map: T) => {
        // const mapFn = narrowObjectToType<TInput>().cb;

        return <I extends Record<string, N>, N extends Narrowable>(
            input: I & TInput,
        ): MapperReturns<I, TOutput, T> => {
            const api = objectToApi(input) as unknown as ObjectToApi<TInput>;
            const rtn = map(api);

            return handleDoneFn(rtn) as MapperReturns<I, TOutput, T>;
        };
    };
}

function objectApi<TInput extends AnyObject>() {
    return {
        mapTo: <TToDefn extends DefineObject>(_defn: TToDefn) => ({
            mapper: mapper<TInput, FromDefineObject<TToDefn>>(),
        }),
        mapToWithType: <TOutput extends AnyObject>() => mapper<TInput, TOutput>(),
    };
}

function defineObjectApi__Fn<T extends DefineObject>(_inputDefn: T) {
    return objectApi<FromDefineObject<T>>();
}
const defineObjectApi__Prop = {
    withType: <TInput extends AnyObject>() => {
        return objectApi<TInput>();
    },
};

/**
 * **defineObjectApi**`(inputDefn) → api`
 *
 * **defineObjectApi.withType**`<TInput>() → api`
 *
 * a
 */
export const defineObjectApi = createFnWithProps(
    defineObjectApi__Fn,
    defineObjectApi__Prop,
);

// const a = defineObjectApi.withType<{ foo: string; bar: number }>()
//   .mapTo({
//     one: "number",
//     two: "string(foo,bar,baz)",
//   })
//   .mapper(i => ({
//     one: i.bar(),
//     two: ["foo", "bar", "baz"].includes(i.foo()) ? i.foo() as "foo" | "bar" | "baz" : "foo",
//   }));

// const b = a({ foo: "bar", bar: 42 });
