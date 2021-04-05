import { IModel } from "~/Model";

export interface ISimpleTable<T extends {}, S extends Readonly<string>> {
  name: S;
  is: IModel<T, S>["is"];
  encode: IModel<T, S>["encode"];
  decode: IModel<T, S>["decode"];
  select: (...cols: Array<keyof T> | ["*"]) => string;
}

export const SimpleTable = <T extends {}, S extends Readonly<string>>(
  model: IModel<T, S>
): ISimpleTable<T, S> => {
  return {
    name: model.name,
    is: model.is,
    encode: model.encode,
    decode: model.decode,
    select: (..._cols: Array<keyof T> | ["*"]) => `You did it`,
  };
};
