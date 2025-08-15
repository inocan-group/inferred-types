/**
 * **createTakeStartEndFunction**`(startEnd, opts) -> take fn`
 *
 * creates a `take` function which is based on a
 * **start** and **end** token(s).
 */
export function createTakeStartEndFunction<
    const TStartEnd extends Record<string, string>,
    const TOpt
>(
    _startEnd: TStartEnd,
    _opts: TOpt
) {
    return <TParse extends string>(_str: TParse) => {

    };
}
