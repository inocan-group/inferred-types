/**
 * **TakeProp**`<TTest,TProp,[TElse]>`
 *
 * Takes the property `TTest` and determines if `TProp` is a key of
 * of `TTest`. If it is it will return `TTest[TProp]` otherwise `TElse`
 * (which is defaulted to _undefined_).
 */
export type TakeProp<
    TTest,
    TProp extends PropertyKey,
    TElse = undefined,
> = TProp extends keyof TTest
    ? TTest[TProp]
    : TElse;
