import type { Nesting } from "inferred-types/types";
import type { NormalizeNestingEntry } from "./NormalizeNestingEntry";

export type ExtractExitTokens<V, TFallback extends Nesting> =
    NormalizeNestingEntry<V, TFallback>["exit"];
