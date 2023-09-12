import { EmptyObject, IfLength, IndexableObject, Length } from "src/types";

export type IndexedObject<
  T extends EmptyObject | IndexableObject = EmptyObject | IndexableObject
> = T extends EmptyObject
  ? never
  : Length<T> extends 0 
    ? never
    : T;


