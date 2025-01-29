/**
 * **NodeCallback**
 *
 * The shape of a NodeJS callback function
 */
export type NodeCallback = (
  ((err?: any) => void) |
  ((err: any, result: any) => void)
);
