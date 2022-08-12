export const readOnlyProps = <T extends {}, RO extends readonly string[]>(obj: T, props: RO) => {
  const ro = new Proxy(obj, {
     get<P extends keyof T>(obj: T, prop: P, ): T[P];
  });
};