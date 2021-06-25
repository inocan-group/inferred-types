
import type { ExpandRecursively, PrivateKeys } from "~/types";

export type Api<T extends object, P extends object = {}> = ExpandRecursively<Omit<T, PrivateKeys<T>>>;

export type ExtractPrivateApi<T extends Api<any>, P extends object> = (api: T) => P;