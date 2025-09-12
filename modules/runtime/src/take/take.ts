import { asTakeState, isError, isNull, stripLeading } from "inferred-types/runtime";
import type { AsTakeState, TakeState, TakeParser, UpdateTake } from "inferred-types/types";



export function append<
    TList extends readonly unknown[],
    TItem
>(list: TList, add: TItem): [...TList, TItem] {
    return [...list, add] as [...TList, TItem]
}


/**
 * **takeStart**`(...start) -> (parser) -> (val) -> result`
 *
 * A higher order **take** function which starts by defining the string literals
 * which would make a match.
 *
 * - once defined, the second call to this HOF provides the **value** to test test against.
 * It will return:
 *     - Err<"unmatched"> - if none of the provided string literals were found at the
 * head of the string
 *     - `TakeSuccess` - if there was a match
 *
 * If you wish to override the error which is returned you can add a callback as a second
 * parameter. The callback will receive the `Err<"unmatched">` and your callback can convert
 * this to whatever type you like (however, some sort of Error is typically a good idea).
 */
export function take<TParse extends TakeParser>(parser: TParse) {

    return <TVal extends string | TakeState | Error>(val: TVal): UpdateTake<AsTakeState<TVal>, ReturnType<TParse>> => {
        const state = asTakeState(val);
        if(isError(state)) {
            return state as unknown as UpdateTake<AsTakeState<TVal>, ReturnType<TParse>>;
        }

        const [taken, token] = parser(state);

        return isNull(taken)
            ? token as unknown as UpdateTake<AsTakeState<TVal>, ReturnType<TParse>>
            : {
                ...state,
                parsed: [...state["parsed"], taken],
                parseString: stripLeading(state["parseString"],  taken),
                tokens: append(state["tokens"], token)
            } as UpdateTake<AsTakeState<TVal>, ReturnType<TParse>>
    }

}


