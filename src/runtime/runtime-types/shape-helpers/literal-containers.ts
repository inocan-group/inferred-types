import { DictionaryTypeDefn, FromDefn, TupleDefn } from "inferred-types/dist/types/index";



export const dictionary = <T extends DictionaryTypeDefn>(_obj: T) => {
  // TODO

  return null as unknown as FromDefn<T>
};

;
export const tuple = <T extends readonly TupleDefn[]>(..._elements: T) => {
  // TODO
  return null as unknown as FromDefn<T>;
}



