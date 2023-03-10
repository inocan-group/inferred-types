import { Container, Tuple } from "src/types";

/**
 * **KeyFor**`<T>`
 * 
 * Type utility which provides the _type_ for a **key** in the given container `T`. 
 */
export type KeyFor<T extends Container> = T extends Tuple ? number : string | symbol;
