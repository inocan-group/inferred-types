import { IsLiteralLike } from "types/boolean-logic";

export type IsWideType<T> = IsLiteralLike<T> extends true
? false
: true;
