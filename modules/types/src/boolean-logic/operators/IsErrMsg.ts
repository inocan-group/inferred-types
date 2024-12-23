export type IsErrMsg<T, U extends string = string> = T extends U & { kind: "ErrMsg" }
  ? true
  : false;
