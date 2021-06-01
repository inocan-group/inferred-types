export type ApiFunction<P extends any[], R extends any> = (...args: P) => R;
export type FluentFunction<P extends any[], R extends any> = (...args: P) => R;
export type ApiValue<V extends any> = V;

/**
 * Expresses the API in a structured manner while making distinction
 * between a function endpoint and a _fluent_ function endpoint.
 */
export type Api<T extends object> = {
  [K in keyof T]: T[K] extends (...args: any) => T
  ? FluentFunction<Parameters<T[K]>, ReturnType<T[K]>>
  : T[K] extends (...args: any) => any
  ? ApiFunction<Parameters<T[K]>, ReturnType<T[K]>>
  : ApiValue<T[K]>
};

