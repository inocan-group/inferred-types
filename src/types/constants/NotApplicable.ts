export const NOT_APPLICABLE = Symbol("not applicable");
/**
 * A unique symbol which indicates that a particular
 * type was "not applicable".
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type NotApplicable<Why extends string> = [
  kind: "not-applicable", 
  reason: Why, 
  uniqueness: typeof NOT_APPLICABLE
];
