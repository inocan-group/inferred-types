type Int<T extends number | string> = `${T}` extends `${infer F}.${string}`
  ? F : `${T}`;
