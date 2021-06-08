export type DictKv<T extends NonNullable<{}>, K extends keyof T> = {
  key: K;
  value: Pick<T, K>;
};
