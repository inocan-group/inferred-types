import { TakeState } from "inferred-types/types";

/**
 * **TakeParser**
 *
 * A parser function that is provided a `Take` state and must convert that into:
 *
 * 1. When able to parse the head of the parse string successfully: `[ taken: string, parsed: [State["parsed"], T] ]`
 * 2. When parser is not able to parse the head of the string: `[ taken: "", parsed: State["parsed"] ]`
 * 3. If parser engages to parse the head of the parse string but see's a structural problem with the input,
 * a tuple of the type `[ null, Error ]` should be returned.
 */
export type TakeParser = <
    T extends TakeState | string
>(parse: T) =>
| [ taken: string, parsed: readonly unknown[] ]
| [ null, Error ];
