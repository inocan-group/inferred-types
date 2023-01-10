
/**
 * **RemoveFromEnd**`<TContent,TRemove>`
 * 
 * Type utility which removes selected text -- `TRemove` -- from the end of `TContent`.
 * 
 * Note: if `TRemove` is not found then `TContent is left unchanged
 */
export type RemoveFromEnd<
  TContent extends string, 
  TRemove extends string
> = TContent extends `${infer Start}${TRemove}`
  ? Start
  : TContent;
