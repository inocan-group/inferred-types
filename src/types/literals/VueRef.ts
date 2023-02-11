

export type VueRef<T> = {
  value: T;
  /**
   * Used for type differentiation; the `VueRef<T>` is 
   * meant as a proxy for VueJS's `Ref<T>`.
   */
  [key: symbol]: true;
};

