import { AllCaps } from "./AllCaps";

/** 
 * If **ALL CAPS** it converts to all lowercase; if not then it does nothing */
export type LowerAllCaps<T extends string> = AllCaps<T> extends true ? Lowercase<T> : T;