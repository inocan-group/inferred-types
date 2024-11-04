import { FixedLengthArray } from "@inferred-types/types";


/**
 * A "Last In, First out" queue (**LIFO**)
 */
export type LifoQueue<
  TType
> = {
  queue: TType[];
  size: number;
  /**
   * reports back a boolean value to indicate whether the queue is empty or not
   */
  isEmpty(): boolean;
  /**
   * pushes additional items into the queue
   */
  push<T extends TType[]>(...add: T): void;
  /**
   * Drop a number of items from the top of the queue; if
   * quantity is not provided then 1 item will be dropped.
   */
  drop<T extends number>(quantity?: T): void;

  /** clears the values in the queue */
  clear(): void;
  /** similar to `clear()` but returns the current queue items before clearing */
  drain(): TType[];
  /**
   * Take 1 or more values from the top of the queue.
   */
  take<T extends number | undefined>(quantity?: T): FixedLengthArray<
    TType,
    T extends undefined ? 1 : T
  >;

  [Symbol.iterator](): Iterator<TType>
}
