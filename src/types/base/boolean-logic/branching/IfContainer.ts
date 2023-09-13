import { IsContainer } from "../..";

/**
 * **IfContainer<T,IF,ELSE>**
 * 
 * Type operator which identifies if `T` is a _container_ where a container is
 * any object or array.
 */
export type IfContainer<T, IF, ELSE> = IsContainer<T> extends true 
  ? IF
  : ELSE;
