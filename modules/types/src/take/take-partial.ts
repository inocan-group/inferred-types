import {  TakeParser } from "inferred-types/types";


/**
 * **TakeStartFn**
 *
 * A partial application of the `takeStart()` utility (step 2 of 3).
 *
 * - At this stage we have defined the string literals which will
 * provide a _match_ to parse on and are now waiting to get a
 * parser function.
 */
export type TakeStartFn<
    T extends TakeParser,
> = any;
