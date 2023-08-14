export const TYPE_COMPARISONS_CROSS_TYPE = [
  "Extends",
  "Equals",
  "NotEqual",
  "Truthy",
  "Falsy",
  "IsSomething",
  "IsNothing"
] as const;

export const TYPE_COMPARISONS_NUMERIC = [
  "GreaterThan",
  "LessThan",
] as const;

export const TYPE_COMPARISONS_STRING = [
  "StartsWith",
  "EndsWith",
  "Subset"
] as const;

export const TYPE_COMPARISONS_FUNCTION = [
  "ReturnsSomething",
  "ReturnsNothing",
  "ReturnsTrue",
  "ReturnsFalse",
  "ReturnsTruthy",
  "ReturnsFalsy"
] as const;

export const TYPE_COMPARISONS_TUPLE = [
  "Contains"
] as const;


/**
 * **TYPE_COMPARISONS**
 * 
 * A list of _comparison operations_ which can be done between two
 * known typed data structures.
 */
export const TYPE_COMPARISONS = [
  ...TYPE_COMPARISONS_CROSS_TYPE,
  ...TYPE_COMPARISONS_NUMERIC,
  ...TYPE_COMPARISONS_STRING,
  ...TYPE_COMPARISONS_FUNCTION,
  ...TYPE_COMPARISONS_TUPLE
] as const;
