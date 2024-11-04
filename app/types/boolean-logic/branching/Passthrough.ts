import { IfEquals } from "./IfEqual";

/**
 * **Passthrough**`<TContent,TPass,THandle>`
 * 
 * Passes through content in `TContent` when it _extends_ the type
 * of `TPass`, otherwise it changes the type to `THandle`.
 * 
 * **Related:** `THandle`
 */
export type Passthrough<
  TContent,
  TPass,
  THandle,
  TSpecificity extends "extends" | "equals" = "extends"
> = IfEquals<
  TSpecificity, "extends",
  TContent extends TPass
    ? TContent
    : THandle,
  IfEquals<
    TContent, TPass,
    TContent,
    THandle
  >
>
