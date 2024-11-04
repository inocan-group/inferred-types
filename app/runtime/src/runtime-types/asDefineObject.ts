import { DefineObject } from "@inferred-types/types";
import { FromDefn } from "src/types/literals";
import { isDoneFn, isFunction, isSimpleToken } from "../type-guards";
import { asType } from "./asType";
import { ShapeApiImplementation } from "./shape";
import { handleDoneFn } from "../api/handleDoneFn";
import { ShapeCallback } from "src/types/runtime-types";
import { Never } from "@inferred-types/constants";


export const asDefineObject = <T extends DefineObject>(defn: T) => {
  const result =  Object.keys(defn).reduce(
    (acc, i) => isSimpleToken(defn[i])
      ? { ...acc, [i]: asType(defn[i]) }
      : isDoneFn(defn[i])
        ? { ...acc,
            [i]: handleDoneFn((defn[i] as ShapeCallback)(ShapeApiImplementation))
        }
        : isFunction(defn[i])
          ? {
              ...acc,
              [i]: handleDoneFn((defn[i] as ShapeCallback)(ShapeApiImplementation))
          }
          : Never,
    {}
  ) as unknown;

  return result as FromDefn<T>;
}
