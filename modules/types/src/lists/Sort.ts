import type { Dictionary, HandleDoneFn, StringKeys, Suggest } from "inferred-types/types";

type PushTop<
  TNatural extends readonly unknown[],
  TTop extends readonly unknown[],
> = [
  ...TTop,
  ...{
    [K in keyof Exclude<TNatural, TTop[number]>]: Exclude<TNatural, TTop[number]>[K]
  },
];

type PushBottom<
  TNatural extends readonly unknown[],
  TBot extends readonly unknown[],
> = [
  ...{
    [K in keyof Exclude<TNatural, TBot[number]>]: Exclude<TNatural, TBot[number]>[K]
  },
  ...TBot,
];

/**
 * choices depend on container structure:
 *
 * - if object, choices are keys of the object
 * - if tuple, choices are _types_ found in the values
 */
type Choices<
  T extends readonly unknown[] | Dictionary,
> = T extends readonly unknown[]
  ? T[number]
  : T extends Dictionary
    ? StringKeys<T> extends readonly string[]
      ? Suggest<StringKeys<T>[number]>
      : never
    : never;

export interface SortApi<
  T extends readonly unknown[] | Dictionary,
> {
  state: Readonly<T>;
  toTop: <TTop extends Choices<T>[]>(
    ...keys: TTop
  ) => SortApi<PushTop<StringKeys<T>, TTop>>;
  toBottom: <TBot extends readonly Choices<T>[]>(
    ...keys: TBot
  ) => SortApi<PushBottom<StringKeys<T>, TBot>>;
  done: () => T;
}

export type Sort<
  T extends readonly unknown[] | Dictionary,
  TSort extends ((cb: SortApi<T>) => unknown),
> = HandleDoneFn<ReturnType<TSort>>;
