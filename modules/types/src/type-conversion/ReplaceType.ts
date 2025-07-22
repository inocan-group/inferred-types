/**
 * **ReplaceType**
 *
 * Replaces types which extend `TFind` with `TReplace` within `TContent`.
 *
 * - will work where `TContent` is a tuple, a union type or just a bare type
 */
export type ReplaceType<TContent, TFind, TReplace>
  = TContent extends readonly any[]
      ? { [K in keyof TContent]: ReplaceType<TContent[K], TFind, TReplace> }
      : [TContent] extends [TFind] ? TReplace : TContent;
