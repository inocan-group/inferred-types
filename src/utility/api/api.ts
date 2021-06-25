import { Narrowable } from "~/types";

export const api = <N extends Narrowable, TPrivate extends Readonly<Record<any, N>>>(priv: TPrivate) => <TPublic extends object>(pub: TPublic) => {
  const surface = () => pub as TPublic;
  surface.prototype.priv = () => priv as TPrivate;

  return surface;
};

