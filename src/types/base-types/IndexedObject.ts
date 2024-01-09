import { EmptyObject,  IndexableObject, Length } from "..";

export type IndexedObject<
  T extends EmptyObject | IndexableObject = EmptyObject | IndexableObject
> = T extends EmptyObject
  ? never
  : Length<T> extends 0 
    ? never
    : T;


