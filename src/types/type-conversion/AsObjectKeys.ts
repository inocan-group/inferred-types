import { ObjectKey } from "src/types/index";

export type AsObjectKeys<
  T extends readonly unknown[]
> = T extends readonly ObjectKey[]
? T & ObjectKey[]
: never;
