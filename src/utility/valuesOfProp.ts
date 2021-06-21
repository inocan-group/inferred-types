import { KV } from "~/KV";
import { Narrowable } from "~/types/Narrowable";
import { literal, strArrayToDict } from ".";
import { dictToArray } from "./dictToArray";
import { mapValues } from "./mapValues";



export function valuesOfProp<T extends object>() {
  return (arr: T[], prop: keyof T) => {

    for (const i of arr) {
      const v = literal(i[prop]);

    }
  };
}