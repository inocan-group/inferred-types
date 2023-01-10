
/**
 * **RemoveFromStart**`<TContent,TRemove>`
 * 
 * Type utility which removes selected text -- `TRemove` -- from the beginning of `TContent`.
 * 
 * Note: if `TRemove` is not found then `TContent is left unchanged
 */
export type RemoveFromStart<
  TContent extends string, 
  TRemove extends string
> = TContent extends `${TRemove}${infer Rest}`
  ? Rest
  : TContent;
