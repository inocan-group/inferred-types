import type { DefineObject, FromDefn, ShapeCallback } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { isDoneFn, isFunction, isSimpleToken } from "inferred-types/runtime";
import { handleDoneFn } from "../api/handleDoneFn";
import { asType } from "./asType";
import { ShapeApiImplementation } from "./shape";

export function asDefineObject<T extends DefineObject>(defn: T) {
    const result = Object.keys(defn).reduce(
        (acc, i) => isSimpleToken(defn[i])
            ? { ...acc, [i]: asType(defn[i]) }
            : isDoneFn(defn[i])
                ? { ...acc, [i]: handleDoneFn((defn[i] as ShapeCallback)(ShapeApiImplementation)),
                }
                : isFunction(defn[i])
                    ? {
                        ...acc,
                        [i]: handleDoneFn((defn[i] as ShapeCallback)(ShapeApiImplementation)),
                    }
                    : Never,
        {},
    ) as unknown;

    return result as FromDefn<T>;
}
