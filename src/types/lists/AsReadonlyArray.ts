export type AsReadonlyArray<T extends any[]> = T extends readonly[]
  ? T
  : readonly any[];
