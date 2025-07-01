import type { RuntimeTakeFunction } from "inferred-types/types";



/**
 * **createTakeStartEndFunction**`(startEnd, opts) -> take fn`
 *
 * creates a `take` function which is based on a
 * **start** and **end** token(s).
 */
export function createTakeStartEndFunction<
    const TStartEnd extends Record<string, string>,
    const TOpt extends Take__StartEndOptions
>(
    startEnd: TStartEnd,
    opts: TOpt
) {
    return <TParse extends string>(str: TParse) => {

    };
}
