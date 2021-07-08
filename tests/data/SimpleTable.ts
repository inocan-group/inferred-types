import { IoModel } from "~/utility";

export interface ISimpleTable<T extends {}, S extends Readonly<string>> {
  name: S;
  is: IoModel<T, S>["is"];
  encode: IoModel<T, S>["encode"];
  decode: IoModel<T, S>["decode"];
  select: (...cols: Array<keyof T> | ["*"]) => string;
}

export const SimpleTable = <T extends {}, S extends Readonly<string>>(
  model: IoModel<T, S>
): ISimpleTable<T, S> => {
  return {
    name: model.name,
    is: model.is,
    encode: model.encode,
    decode: model.decode,
    select: (..._cols: Array<keyof T> | ["*"]) => `You did it`,
  };
};
