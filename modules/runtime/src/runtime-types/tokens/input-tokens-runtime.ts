import type {
    AfterFirst,
    Dictionary,
    First,
    Tuple,
    TypedFunction
} from "inferred-types/types";
import {
    ifFunction,
    isEmpty,
    isError,
} from "inferred-types/runtime";

type Payload = string | number | boolean | symbol | Dictionary | Tuple | undefined | null | ((input?: Payload) => Payload);

type Pipeline<
    TSteps extends readonly Payload[],
    TPrior extends Payload = undefined
> = [] extends TSteps
    ? TPrior
    : First<TSteps> extends Error
        ? First<TSteps>
        : First<TSteps> extends TypedFunction
            ? ReturnType<First<TSteps>> extends Error
                ? ReturnType<First<TSteps>>
                : Pipeline<AfterFirst<TSteps>, ReturnType<First<TSteps>>>
            : Pipeline<AfterFirst<TSteps>, First<TSteps>>;

function runner<
    I extends Exclude<Payload, TypedFunction>,
    S extends readonly P[],
    P extends Payload
>(
    input: I,
    steps: S
): any {
    // readonly needed for type preservation but we
    // need to step outside of it to allow items to
    // be taken off the stack.
    const stepper = [...steps];
    const el = stepper.shift() as S[0];
    const val = ifFunction(
        el,
        f => f(input),
        el => el
    );

    return (
        isEmpty(steps)
            ? input
            : isError(val)
                ? val
                : runner(
                    val,
                    stepper
                )
    );
}

export function pipeline<T extends readonly Payload[]>(...steps: T) {
    return runner(undefined, steps) as unknown as Pipeline<T>;
}

/**
 * **asTypeToken**`(token)`
 *
 * Takes an `InputToken` and converts it to a `TypeToken` which is
 * simply a string variant of the `InputToken` wrapped in a delimiters
 * to make it easier to parse out of other text.
 */
// export function asTypeToken<T extends InputToken>(token: T) {
//     return isString(token)
//         ? pipeline(
//             asType(token),
//             `<<`
//         )
//         : "hold on"
// }
