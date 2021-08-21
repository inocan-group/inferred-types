import { TypeGuard } from "~/types";
import { TypeOptions } from "../../../types/runtime";

export const string = (opts: TypeOptions = {}) => {
  const tg: TypeGuard<string> = (v: unknown): v is string => {
    return typeof v === "string";
  };
  return type<string>()("string", tg, opts);
};

export const number = (opts: TypeOptions = {}) => {
  const tg: TypeGuard<number> = (v: unknown): v is number => {
    return typeof v === "number";
  };
  return type<number>()("number", tg, opts);
};

export const boolean = (opts: TypeOptions = {}) => {
  const tg: TypeGuard<boolean> = (v: unknown): v is boolean => {
    return typeof v === "boolean";
  };
  return type<boolean>()("string", tg, opts);
};

export const fn = (opts: TypeOptions = {}) => {
  const tg: TypeGuard<Function> = (v: unknown): v is Function => {
    return typeof v === "function";
  };
  return type<Function>()("function", tg, opts);
};

export const nullValue = (opts: TypeOptions = {}) => {
  const tg: TypeGuard<null> = (v: unknown): v is null => {
    return v === "null";
  };
  return type<null>()("null", tg, opts);
};
