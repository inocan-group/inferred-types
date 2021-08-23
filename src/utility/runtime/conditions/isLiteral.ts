export type IsLiteral<L extends string | number, T extends any> = T extends L ? true : false;

export function isLiteral<L extends Readonly<string>>(...allowed: L[]) {
  return <T extends unknown>(i: T) => {
    return !allowed.every((v) => i !== v) as IsLiteral<L, T>;
  };
}
