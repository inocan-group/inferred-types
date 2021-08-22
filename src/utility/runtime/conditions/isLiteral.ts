export function isLiteral<V extends Readonly<string>>(...allowed: V[]) {
  return <T extends unknown>(i: T) => {
    return !allowed.every((v) => i !== v);
  };
}
