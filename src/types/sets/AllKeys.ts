import { Keys,  Container, Flatten, Unique } from "src/types/index";

type Process<
TContainers extends readonly Container[]
> = Flatten<{
[K in keyof TContainers]: TContainers[K] extends Container
  ? Keys<TContainers[K]>
  : []
}>

/**
 * **AllKeys**`<TList>`
 * 
 * Receives a list of _containers_ and produces a deduplicated list
 * of the _keys_ found across all of them.
 */
export type AllKeys<
  TContainers extends readonly Container[]
> = Unique<Process<TContainers>>

