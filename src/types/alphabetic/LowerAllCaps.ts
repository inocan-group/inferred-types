import { AllCaps } from "./AllCaps";

/** if ALL CAPS, converts to all lowercase */
export type LowerAllCaps<T extends string> = AllCaps<T> extends true ? Lowercase<T> : T;