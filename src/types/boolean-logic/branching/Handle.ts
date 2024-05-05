import { IfEquals } from "./IfEqual";

/**
 * **Passthrough**`<TContent,TIf,THandle,[TSpecificity]>`
 * 
 * Redirects `TContent` when it _extends_ the type
 * of `TIf` to `THandle`, otherwise it just proxies the value through.
 * 
 * - if you want a narrower _comparison specificity_ you can set `TSpecificity`
 * to "equals"
 * 
 * **Related:** `THandle`
 */
export type Handle<
  TContent,
  TIf,
  THandle,
  TSpecificity extends "extends" | "equals" = "extends"
> = IfEquals<
  TSpecificity, "extends",
  TContent extends TIf
    ? THandle
    : TContent,
  IfEquals<
    TContent, TIf,
    THandle,
    TContent
  >
>
