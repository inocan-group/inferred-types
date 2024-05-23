import { DictionaryTypeDefn, FromDefn, TupleDefn } from "src/types/index";



export const dictionary = <T extends DictionaryTypeDefn>(obj: T) => {
  // TODO
  
  return null as unknown as FromDefn<T>
};

;
export const tuple = <T extends readonly TupleDefn[]>(...elements: T) => {
  // TODO
  return null as unknown as FromDefn<T>;
}



