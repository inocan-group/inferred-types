import {Keys} from "~/types";

export function isLiteral<V extends readonly Array<unknown>>(...allowed: V) {
  type A = typeof allowed;
  return <T extends unknown>(i: T) => {
    return (!allowed.every((v) => i !== v)) as T extends keyof V;
  };
}

