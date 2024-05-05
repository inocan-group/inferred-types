
/**
 * **Passthrough**`<TContent,TPass,THandle>`
 * 
 * Passes through content in `TContent` when it _extends_ the type
 * of `TPass`, otherwise it changes the type to `THandle`.
 */
export type Passthrough<
  TContent,
  TPass,
  THandle
> = TContent extends TPass
? TContent
: THandle;
