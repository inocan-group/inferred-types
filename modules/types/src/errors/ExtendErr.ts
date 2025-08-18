import { Dictionary } from "types/base-types";
import { ExpandRecursively } from "types/literals";
import { MergeObjects } from "types/type-conversion";

export type ExtendErr<T extends Error, U extends Dictionary> = "message" extends keyof U
? ExpandRecursively<T & Omit<U, "message">> & Error
: ExpandRecursively<T & U> & Error
