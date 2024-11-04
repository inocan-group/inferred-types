
/**
 * **Constant**`<TKind>`
 * 
 * A static value of a particular _kind_.
 */
export type Constant<TKind extends string, TVal = unknown> = {
  _type: "Constant";
  kind: TKind;
  value: TVal;
};
