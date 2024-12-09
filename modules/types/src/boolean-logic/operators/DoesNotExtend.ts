

/**
 * **DoesNotExtend**`<TValue, TNotExtends>`
 *
 * Boolean type utility which returns `true` if `TValue` _does 
 * not extend_ `TNotExtends`.
 */
export type DoesNotExtend<
TValue, 
TNotExtends
> = TValue extends TNotExtends
? false
: true;
